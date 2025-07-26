
import { IEstimationRepository } from "../../Entities/repositoryEntities/Estimation-management/IEstimationRepository";
import { EstimationData, rowData, SpecData } from "../../Entities/Input-OutputEntities/EstimationEntities/estimation";
import { specDB } from "../../Database/Model/SpecModel";
import { estimationDB } from "../../Database/Model/EstimationModel";
import { materialDB } from "../../Database/Model/MaterialModel";
import { labourDB } from "../../Database/Model/LabourModel";
import { estimationMaterialDB } from "../../Database/Model/EstimationMaterialModel";
import { estimationLabourDB } from "../../Database/Model/EstimationLabourModel";
import { estimationAdditionalDB } from "../../Database/Model/EstimationAdditionalModel";
import { IEstimationModelEntity } from "../../Entities/ModelEntities/Estimation.Entity";


export class EstimationRepository implements IEstimationRepository {

   async saveEstimation(specDetails: rowData[], projectId: string): Promise<void> {
      let sum = 0
      for (let char of specDetails) {
         const specDetails = await specDB.findOne({ spec_id: char.spec_id })
         if (specDetails) {
            const newEstimation = new estimationDB({
               spec_id: specDetails._id,
               quantity: char.quantity,
               unit_rate: char.unitrate,
               project_id: projectId
            })
            await newEstimation.save()
            for (let element of specDetails.materialDetails) {
               const existMaterial = await materialDB.findById(element.material_id)
               if (existMaterial) {
                  sum += (element.quantity * existMaterial.unit_rate)
                  const newEstimationMaterial = new estimationMaterialDB({
                     project_id: projectId,
                     material_id: element.material_id,
                     quantity: element.quantity,
                     unit_rate: existMaterial.unit_rate
                  })
                  await newEstimationMaterial.save()
               }
            }
            for (let x of specDetails.labourDetails) {
               const existLabour = await labourDB.findById(x.labour_id)
               if (existLabour) {
                  sum += (x.numberoflabour * existLabour.daily_wage)
                  const newEstimationLabour = new estimationLabourDB({
                     project_id: projectId,
                     labour_id: x.labour_id,
                     numberoflabour: x.numberoflabour,
                     daily_wage: existLabour.daily_wage
                  })
                  await newEstimationLabour.save()
               }
            }
            const newEstimationAdditionalModel = new estimationAdditionalDB({
               additionalExpense_per: specDetails.additionalExpense_per || 0,
               additionalExpense_amount: sum * (specDetails.additionalExpense_per || 0) / 100,
               profit_per: specDetails.profit_per || 0,
               profit_amount: sum * (specDetails.profit_per || 0) / 100,
               project_id: projectId
            })
            await newEstimationAdditionalModel.save()

         }

      }
   }
   async displaySpec(search: string, page: number): Promise<{ data: SpecData[], totalPage: number }> {
      const skip = page * 5
      const data = await estimationDB.aggregate<SpecData>([
         {
            $group: {
               _id: "$project_id",
               budgeted_cost: {
                  $sum: {
                     $multiply: ["$quantity", "$unit_rate"]
                  }
               }
            }
         },
         {
            $addFields: {
               projectObjectId: {
                  $cond: {
                     if: { $eq: [{ $type: "$_id" }, "string"] },
                     then: { $toObjectId: "$_id" },
                     else: "$_id"
                  }
               }
            }
         },
         {
            $lookup: {
               from: "projects",
               localField: "projectObjectId",
               foreignField: "_id",
               as: "projectDetails"
            }
         }, { $unwind: "$projectDetails" }, { $match: { "projectDetails.project_name": { $regex: search, $options: "i" } } }, { $skip: skip }, { $limit: 5 }
      ]);
      
      const totalDoc = await estimationDB.aggregate<SpecData>([
         {
            $group: {
               _id: "$project_id",
               budgeted_cost: {
                  $sum: {
                     $multiply: ["$quantity", "$unit_rate"]
                  }
               }
            }
         },
         {
            $addFields: {
               projectObjectId: {
                  $cond: {
                     if: { $eq: [{ $type: "$_id" }, "string"] },
                     then: { $toObjectId: "$_id" },
                     else: "$_id"
                  }
               }
            }
         },
         {
            $lookup: {
               from: "projects",
               localField: "projectObjectId",
               foreignField: "_id",
               as: "projectDetails"
            }
         }, { $unwind: "$projectDetails" }, { $match: { "projectDetails.project_name": { $regex: search, $options: "i" } } }
      ]);

      const totalPage = Math.ceil(totalDoc.length / 5)
      return { data, totalPage };
   }

   async deleteEstimationById(_id: string): Promise<void> {
      await estimationDB.deleteMany({ project_id: _id })
      await estimationAdditionalDB.deleteMany({ project_id: _id })
      await estimationLabourDB.deleteMany({ project_id: _id })
      await estimationMaterialDB.deleteMany({ project_id: _id })
   }
   async findEstimationByProjectId(projectId: string): Promise<IEstimationModelEntity[] | []> {
      const existdata = await estimationDB.find({ project_id: projectId })
      return existdata
   }
   async findEstimationBySpecId(_id: string): Promise<IEstimationModelEntity | null> {
      const existData = await estimationDB.findOne({ spec_id: _id })
      return existData
   }
   async AggregateEstimationBySpec(_id: string): Promise<IEstimationModelEntity[]> {
      const existData = await estimationDB.aggregate([{
         $match: { project_id: _id }
      }, {
         $addFields: {
            specObjectId: { $toObjectId: "$spec_id" }
         }
      }, {
         $lookup: {
            from: "specs",
            localField: "specObjectId",
            foreignField: "_id",
            as: "specDetails"
         }
      },{$unwind:"$specDetails"}])
      return existData
   }
}