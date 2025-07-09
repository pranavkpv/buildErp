import mongoose from "mongoose";
import { IEstimationRepository } from "../../domain/repositories/IEstimationRepository";
import { EstimationData, outPutEstimation, rowData, SpecData } from "../../domain/types/estimation";
import EstimationAdditionalModel from "../../models/EstimationAdditionalMode";
import EstimationLabourModel from "../../models/EstimationLabourModel";
import EstimationMaterialModel from "../../models/EstimationMaterialModel";
import EstimationModel from "../../models/EstimationModel";
import LabourModel from "../../models/LabourModel";
import MaterialModel from "../../models/MaterialModel";
import SpecModel from "../../models/SpecModel";


export class EstimationMongooseRepository implements IEstimationRepository {
   async saveEstimation(specDetails: rowData[], projectId: string): Promise<void> {
      let sum = 0
      console.log(specDetails)
      for (let char of specDetails) {
         const specDetails = await SpecModel.findOne({ spec_id: char.spec_id })
         if (specDetails) {
            const newEstimation = new EstimationModel({
               spec_id: specDetails._id,
               quantity: char.quantity,
               unit_rate: char.unitrate,
               project_id: projectId
            })
            await newEstimation.save()
            for (let element of specDetails.materialDetails) {
               const existMaterial = await MaterialModel.findById(element.material_id)
               if (existMaterial) {
                  sum += (element.quantity * existMaterial.unit_rate)
                  const newEstimationMaterial = new EstimationMaterialModel({
                     project_id: projectId,
                     material_id: element.material_id,
                     quantity: element.quantity,
                     unit_rate: existMaterial.unit_rate
                  })
                  await newEstimationMaterial.save()
               }
            }
            for (let x of specDetails.labourDetails) {
               const existLabour = await LabourModel.findById(x.labour_id)
               if (existLabour) {
                  sum += (x.numberoflabour * existLabour.daily_wage)
                  const newEstimationLabour = new EstimationLabourModel({
                     project_id: projectId,
                     labour_id: x.labour_id,
                     numberoflabour: x.numberoflabour,
                     daily_wage: existLabour.daily_wage
                  })
                  await newEstimationLabour.save()
               }
            }
            const newEstimationAdditionalModel = new EstimationAdditionalModel({
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
   async displaySpec(search: string, page: number): Promise<{data:SpecData[],totalPage:number}> {
      const skip = page * 5
      const data = await EstimationModel.aggregate<SpecData>([
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
      },{$unwind:"$projectDetails"},{ $match: { "projectDetails.project_name": { $regex: search, $options: "i" } } }, { $skip: skip }, { $limit: 5 }
      ]);

      const totalPage = Math.ceil(await EstimationModel.countDocuments()/5)
      return {data,totalPage};
   }

   async deleteEstimationById(_id: string): Promise<void> {
      await EstimationModel.findOneAndDelete({ project_id: _id })
      await EstimationAdditionalModel.deleteMany({ project_id: _id })
      await EstimationLabourModel.deleteMany({ project_id: _id })
      await EstimationMaterialModel.deleteMany({ project_id: _id })
   }
   async findEstimationByProjectId(projectId: string): Promise<EstimationData[] | []> {
      const existdata = await EstimationModel.find({ project_id: projectId })
      return existdata ? existdata : []
   }


}