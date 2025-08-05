import { receiveDB } from "../../Database/Model/ReceiveModel";
import { transferDB } from "../../Database/Model/TransferModel";
import { RecieveInput, RecieveOutput } from "../../Entities/Input-OutputEntities/PurchaseEntity.ts/Receive";
import { IReceiveModelEntity } from "../../Entities/ModelEntities/Recieve.Entity";
import { IReceiveRepository } from "../../Entities/repositoryEntities/Purchase-management/IReceiveRepository";

export class ReceiveRepository implements IReceiveRepository {
   async saveReceive(input: RecieveInput): Promise<boolean> {
      const { project_id, date, description, materialDetails, transferId } = input
      const newRecieveData = new receiveDB({
         approval_status: false,
         date,
         description,
         materialDetails,
         project_id,
         transfer_id: transferId
      })
      await newRecieveData.save()
      return true
   }
   async getReceive(search: string, page: number): Promise<RecieveOutput> {
      const receiveData = await receiveDB.aggregate([
         {
            $addFields: {
               projectObjectId: { $toObjectId: "$project_id" }
            }
         },
         {
            $lookup: {
               from: "projects",
               localField: "projectObjectId",
               foreignField: "_id",
               as: "projectDetails"
            }
         },
         { $unwind: "$projectDetails" },
         { $match: { "projectDetails.project_name": { $regex: search, $options: "i" },approval_status:false } },
         {
            $addFields: {
               net_amount: {
                  $sum: {
                     $map: {
                        input: "$materialDetails",
                        as: "mat",
                        in: { $multiply: ["$$mat.quantity", "$$mat.unit_rate"] }
                     }
                  }
               }
            }
         },

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
         },
         { $unwind: "$materialDetails.materialInfo" },
         {
            $addFields: {
               "materialDetails.brandObjectId": { $toObjectId: "$materialDetails.materialInfo.brand_id" },
               "materialDetails.unitObjectId": { $toObjectId: "$materialDetails.materialInfo.unit_id" }
            }
         },
         {
            $lookup: {
               from: "brands",
               localField: "materialDetails.brandObjectId",
               foreignField: "_id",
               as: "materialDetails.brandInfo"
            }
         },
         { $unwind: "$materialDetails.brandInfo" },
         {
            $lookup: {
               from: "units",
               localField: "materialDetails.unitObjectId",
               foreignField: "_id",
               as: "materialDetails.unitInfo"
            }
         },
         { $unwind: "$materialDetails.unitInfo" },
         { $unwind: "$transfer_id" },
         {
            $addFields: {
               transferObjectId: { $toObjectId: "$transfer_id" }
            }
         },
         {
            $lookup: {
               from: "transfers",
               localField: "transferObjectId",
               foreignField: "_id",
               as: "transferDetails"
            }
         },
         { $unwind: "$transferDetails" },
         {
            $addFields: {
               "transferDetails.fromprojectObjectId": { $toObjectId: "$transferDetails.from_project_id" }
            }
         },
         {
            $lookup: {
               from: "projects",
               localField: "transferDetails.fromprojectObjectId",
               foreignField: "_id",
               as: "fromProjectDetails"
            }
         },
         { $unwind: "$fromProjectDetails" },
         {
            $group: {
               _id: "$_id",
               project_id: { $first: "$project_id" },
               Toproject_name: { $first: "$projectDetails.project_name" },
               date: { $first: "$date" },
               finalAmount: { $first: "$net_amount" },
               materialData: {
                  $push: {
                     material_name: "$materialDetails.materialInfo.material_name",
                     material_id: "$materialDetails.materialInfo._id",
                     brand_name: "$materialDetails.brandInfo.brand_name",
                     unit_name: "$materialDetails.unitInfo.unit_name",
                     quantity: "$materialDetails.quantity",
                     unit_rate: "$materialDetails.unit_rate"
                  }
               },
               transferDetails: {
                  $push: {
                     _id: "$transferDetails._id",
                     date: "$transferDetails.date",
                     fromproject_name: "$fromProjectDetails.project_name",
                     transfer_id: "$transferDetails.transfer_id",
                     finalAmount: {
                        $sum: {
                           $map: {
                              input: "$transferDetails.materialDetails",
                              as: "mat",
                              in: { $multiply: ["$$mat.quantity", "$$mat.unit_rate"] }
                           }
                        }
                     }
                  }
               }
            }
         }, { $skip: page * 5 }, { $limit: 5 }
      ]);
      const totalData = await receiveDB.aggregate([
         {
            $addFields: {
               projectObjectId: { $toObjectId: "$project_id" }
            }
         },
         {
            $lookup: {
               from: "projects",
               localField: "projectObjectId",
               foreignField: "_id",
               as: "projectDetails"
            }
         },
         { $unwind: "$projectDetails" },
         { $match: { "projectDetails.project_name": { $regex: search, $options: "i" },approval_status:false } }
      ])

      return { data: receiveData,totalPage:Math.ceil(totalData.length/5) };
   }
   async updateReceive(input: RecieveInput): Promise<boolean> {
      const { _id, project_id, date, description, materialDetails, transferId } = input
      await receiveDB.findByIdAndUpdate(_id,
         {
            project_id,
            date,
            description,
            materialDetails,
            transfer_id: transferId
         })
      return true

   }
   async deleteReceiveById(_id: string): Promise<boolean> {
      await receiveDB.findByIdAndDelete(_id)
      return true
   }
   async getReceiveById(_id: string): Promise<IReceiveModelEntity | null> {
      const data = await receiveDB.findById(_id)
      return data ? data : null
   }
   async approveReceive(_id: string): Promise<void> {
      await receiveDB.findByIdAndUpdate(_id, { approval_status: true })
   }

}