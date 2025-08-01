import { purchaseDB } from "../../Database/Model/PurchaseModel";
import { purchaseInput, purchaseModel, purchaseOutput } from "../../Entities/Input-OutputEntities/PurchaseEntity.ts/Purchase";
import { IPurchaseRepository } from "../../Entities/repositoryEntities/Purchase-management/IPurchaseRepository";



export class PurchaseRepository implements IPurchaseRepository {
   async findAllPurchaseBySearchandPage(search: string, page: number, id: string): Promise<purchaseOutput> {
      const skip = page * 5;
      const allPurchase = await purchaseDB.aggregate([
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
         {
            $match: {
               $or: [
                  { "projectDetails.project_name": { $regex: search, $options: "i" } },
                  { "invoice_number": { $regex: search, $options: "i" } }
               ],
               "projectDetails.sitemanager_id": id,
                "approval_status": false ,
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
               _id: "$_id", project_id: { $first: "$project_id" }, project_name: { $first: "$projectDetails.project_name" },
               invoice_number: { $first: "$invoice_number" }, date: { $first: "$date" }, description: { $first: "$description" }, materialDetails: {
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
      const data: purchaseModel[] = allPurchase.map((element: any) => ({
         _id: element._id,
         project_id: element.project_id,
         project_name: element.project_name,
         invoice_number: element.invoice_number,
         date: element.date,
         description: element.description,
         materialDetails: element.materialDetails,
         finalAmount: element.materialDetails.reduce((sum: number, mat: any) => sum + (mat.quantity * mat.unit_rate), 0)
      }));

      const totalDocuments = await purchaseDB.aggregate([
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
         {
            $match: {
               $or: [
                  { "projectDetails.project_name": { $regex: search, $options: "i" } },
                  { "invoice_number": { $regex: search, $options: "i" } }
               ],
               "projectDetails.sitemanager_id": id,
               "approval_status": false 
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


   async savePurchase(input: purchaseInput): Promise<boolean> {
      const { project_id, invoice_number, date, description, materialDetails } = input
      const newPurchaseDB = new purchaseDB({
         project_id,
         invoice_number,
         date: new Date(date),
         approval_status: false,
         description,
         materialDetails
      })
      await newPurchaseDB.save()
      return true
   }
   async updatePurchase(input: purchaseInput): Promise<boolean> {
      const { _id, project_id, invoice_number, date, description, materialDetails } = input
      await purchaseDB.findByIdAndUpdate(_id, {
         project_id,
         invoice_number,
         date,
         description,
         materialDetails
      })
      return true
   }
   async deletePurchase(_id: string): Promise<void> {
      await purchaseDB.findByIdAndDelete(_id)
   }
   async approvePurchase(_id: string): Promise<void> {
      await purchaseDB.findByIdAndUpdate(_id, { approval_status: true })
   }
}
