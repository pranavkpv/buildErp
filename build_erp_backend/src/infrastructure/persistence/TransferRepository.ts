import mongoose from "mongoose";
import { projectDB } from "../../Database/Model/ProjectModel";
import { transferDB } from "../../Database/Model/TransferModel";
import { materialDetails } from "../../Entities/Input-OutputEntities/EstimationEntities/specification";
import { materialData, projectData, transferInput, transferModel, TransferOutput } from "../../Entities/Input-OutputEntities/PurchaseEntity.ts/Transfer";
import { ITransferModelEntity } from "../../Entities/ModelEntities/Transfer.Entity";
import { ITransferRepository } from "../../Entities/repositoryEntities/Purchase-management/ITransferRepository";

export class TransferRepository implements ITransferRepository {
   async fetchTransferList(search: string, page: number, id: string): Promise<TransferOutput> {
      const skip = page * 5;
      const allTransfer = await transferDB.aggregate([
         {
            $addFields: {
               fromprojectObjectId: { $toObjectId: "$from_project_id" }
            }
         },
         {
            $lookup: {
               from: "projects",
               localField: "fromprojectObjectId",
               foreignField: "_id",
               as: "fromprojectDetails"
            }
         },
         { $unwind: "$fromprojectDetails" },
         {
            $addFields: {
               toprojectObjectId: { $toObjectId: "$to_project_id" }
            }
         },
         {
            $lookup: {
               from: "projects",
               localField: "toprojectObjectId",
               foreignField: "_id",
               as: "toprojectDetails"
            }
         },
         { $unwind: "$toprojectDetails" },

         {
            $match: {
               $or: [
                  { "fromprojectDetails.project_name": { $regex: search, $options: "i" } },
                  { "toprojectDetails.project_name": { $regex: search, $options: "i" } },
                  { "transfer_id": { $regex: search, $options: "i" } }
               ],
               "fromprojectDetails.sitemanager_id": id,
               "approval_status": false,
            }
         }, { $unwind: "$materialDetails" },
         {
            $addFields: {
               "materialDetails.materialObjectId": { $toObjectId: "$materialDetails.material_id" }
            }
         },
         {
            $lookup: {
               from: "materials",
               localField: "materialDetails.materialObjectId",
               foreignField: "_id",
               as: "materialDetails.materialInfo"
            }
         }, { $unwind: "$materialDetails.materialInfo" },
         {
            $addFields: {
               "materialDetails.brandObjectId": { $toObjectId: "$materialDetails.materialInfo.brand_id" }
            }
         }, {
            $lookup: {
               from: "brands",
               localField: "materialDetails.brandObjectId",
               foreignField: "_id",
               as: "materialDetails.brandInfo"
            }
         }, { $unwind: "$materialDetails.brandInfo" },
         {
            $addFields: {
               "materialDetails.unitObjectId": { $toObjectId: "$materialDetails.materialInfo.unit_id" }
            }
         }, {
            $lookup: {
               from: "units",
               localField: "materialDetails.unitObjectId",
               foreignField: "_id",
               as: "materialDetails.unitInfo"
            }
         }, { $unwind: "$materialDetails.unitInfo" },
         {
            $group: {
               _id: "$_id", from_project_id: { $first: "$from_project_id" }, fromproject_name: { $first: "$fromprojectDetails.project_name" },
               to_project_id: { $first: "$to_project_id" }, toproject_name: { $first: "$toprojectDetails.project_name" },
               transfer_id: { $first: "$transfer_id" }, date: { $first: "$date" }, description: { $first: "$description" }, materialDetails: {
                  $push: {
                     material_id: "$materialDetails.material_id",
                     material_name: "$materialDetails.materialInfo.material_name",
                     brand_name: "$materialDetails.brandInfo.brand_name",
                     unit_name: "$materialDetails.unitInfo.unit_name",
                     quantity: "$materialDetails.quantity",
                     unit_rate: "$materialDetails.unit_rate"
                  }
               }
            }
         },
         { $skip: skip },
         { $limit: 5 }
      ]);



      const data: transferModel[] = allTransfer.map((element: any) => ({
         _id: element._id,
         from_project_id: element.from_project_id,
         fromproject_name: element.fromproject_name,
         to_project_id: element.to_project_id,
         toproject_name: element.toproject_name,
         transfer_id: element.transfer_id,
         date: element.date,
         description: element.description,
         materialDetails: element.materialDetails,
         finalAmount: element.materialDetails.reduce((sum: number, mat: any) => sum + (mat.quantity * mat.unit_rate), 0)
      }));

      const totalDocuments = await transferDB.aggregate([
         {
            $addFields: {
               fromprojectObjectId: { $toObjectId: "$from_project_id" }
            }
         },
         {
            $lookup: {
               from: "projects",
               localField: "fromprojectObjectId",
               foreignField: "_id",
               as: "fromprojectDetails"
            }
         },
         { $unwind: "$fromprojectDetails" },
         {
            $addFields: {
               toprojectObjectId: { $toObjectId: "$to_project_id" }
            }
         },
         {
            $lookup: {
               from: "projects",
               localField: "toprojectObjectId",
               foreignField: "_id",
               as: "toprojectDetails"
            }
         },
         { $unwind: "$toprojectDetails" },

         {
            $match: {
               $or: [
                  { "fromprojectDetails.project_name": { $regex: search, $options: "i" } },
                  { "toprojectDetails.project_name": { $regex: search, $options: "i" } },
                  { "transfer_id": { $regex: search, $options: "i" } }
               ],
               "fromprojectDetails.sitemanager_id": id,
               "approval_status": false,
            }
         },
         { $count: "total" }
      ]);

      const total = totalDocuments[0]?.total || 0;

      return {
         data,
         totalPage: Math.ceil(total / 5)
      };
   }

   async fectToproject(projectId: string): Promise<projectData[]> {
      const projectList = await projectDB.find({ _id: { $ne: projectId } }, { _id: 1, project_name: 1 })
      const formattedProjects = projectList.map(project => ({
         _id: project._id.toString(),
         project_name: project.project_name
      }))
      return formattedProjects
   }
   async saveTransfer(input: transferInput): Promise<boolean> {
      const { from_project_id, to_project_id, transfer_id, date, description, materialDetails } = input
      const newTransfer = new transferDB({
         from_project_id,
         to_project_id,
         transfer_id,
         date,
         description,
         materialDetails,
         approval_status: false,
         receive_status: false
      })
      await newTransfer.save()
      return true
   }
   async updateTransfer(input: transferInput): Promise<boolean> {
      const { _id, from_project_id, to_project_id, transfer_id, date, description, materialDetails } = input
      await transferDB.findByIdAndUpdate(_id, {
         from_project_id, to_project_id, transfer_id, date, description, materialDetails
      })
      return true
   }
   async approveTransfer(_id: string): Promise<void> {
      await transferDB.findByIdAndUpdate(_id, { approval_status: true })
   }
   async deleteTransfer(_id: string): Promise<boolean> {
      await transferDB.findByIdAndDelete(_id)
      return true
   }
   async findTransferBytransferId(transfer_id: string): Promise<ITransferModelEntity | null> {
      const data = await transferDB.findOne({ transfer_id })
      return data ? data : null
   }
   async findTransferDataByToProjectAndDate(_id: string, date: string): Promise<TransferOutput> {
      const dt = new Date(date)
      const projectId = new mongoose.Types.ObjectId(_id)
      const allTransfer = await transferDB.aggregate([
         {
            $addFields: {
               toprojectObjectId: { $toObjectId: "$to_project_id" }
            }
         },
         {
            $lookup: {
               from: "projects",
               localField: "toprojectObjectId",
               foreignField: "_id",
               as: "toprojectDetails"
            }
         },
         { $unwind: "$toprojectDetails" },
         {
            $match: {
               "toprojectObjectId": projectId,
               approval_status:true,
               date: { $lte: dt },
               receive_status:false
            }
         }
         ,
         { $unwind: "$materialDetails" },
         {
            $addFields: {
               "materialDetails.materialObjectId": { $toObjectId: "$materialDetails.material_id" }
            }
         },
         {
            $lookup: {
               from: "materials",
               localField: "materialDetails.materialObjectId",
               foreignField: "_id",
               as: "materialDetails.materialInfo"
            }
         }, { $unwind: "$materialDetails.materialInfo" },
         {
            $addFields: {
               "materialDetails.brandObjectId": { $toObjectId: "$materialDetails.materialInfo.brand_id" }
            }
         }, {
            $lookup: {
               from: "brands",
               localField: "materialDetails.brandObjectId",
               foreignField: "_id",
               as: "materialDetails.brandInfo"
            }
         }, { $unwind: "$materialDetails.brandInfo" },
         {
            $addFields: {
               "materialDetails.unitObjectId": { $toObjectId: "$materialDetails.materialInfo.unit_id" }
            }
         }, {
            $lookup: {
               from: "units",
               localField: "materialDetails.unitObjectId",
               foreignField: "_id",
               as: "materialDetails.unitInfo"
            }
         }, { $unwind: "$materialDetails.unitInfo" },
         {
            $group: {
               _id: "$_id", project_name: { $first: "$toprojectDetails.project_name" },
               transfer_id: { $first: "$transfer_id" }, date: { $first: "$date" }, description: { $first: "$description" }, materialDetails: {
                  $push: {
                     material_id: "$materialDetails.material_id",
                     material_name: "$materialDetails.materialInfo.material_name",
                     brand_name: "$materialDetails.brandInfo.brand_name",
                     unit_name: "$materialDetails.unitInfo.unit_name",
                     quantity: "$materialDetails.quantity",
                     unit_rate: "$materialDetails.unit_rate"
                  }
               }
            }
         }
      ]);


      const neededData = []
      for (let element of allTransfer) {
         neededData.push({
            _id: element._id, date: element.date, fromproject_name: element.project_name,
            transfer_id: element.transfer_id, materialDetails: element.materialDetails,
            finalAmount: element.materialDetails.reduce((sum: number, num: materialData) => sum += (num.quantity * num.unit_rate), 0)
         })
      }
      return { data: neededData }
   }
   async UpdateReceiveStatus(transferId: string[]): Promise<void> {
      await transferDB.updateMany({ _id: { $in: transferId } }, { receive_status: true })
   }
   async updateReceiveStatusToFalse(transfer_id: string[]): Promise<void> {
      await transferDB.updateMany({ _id: { $in: transfer_id } }, { receive_status: false })
   }
}