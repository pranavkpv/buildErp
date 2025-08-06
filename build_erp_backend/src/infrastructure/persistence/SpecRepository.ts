import { ISpecRepository } from "../../Entities/repositoryEntities/Estimation-management/ISpecRepository";
import { aggregateSpec, Specification, specOutput } from "../../Entities/Input-OutputEntities/EstimationEntities/specification";
import { specDB } from "../../Database/Model/SpecModel";
import { ISpecModelEntity } from "../../Entities/ModelEntities/Spec.Entity";


export class SpecRepository implements ISpecRepository {
   async fetchSpecList(page: number, search: string): Promise<{ result: any[], totalPage: number }> {
      const skip = page * 5;


      const totalDocuments = await specDB.countDocuments();
      const totalPage = Math.ceil(totalDocuments / 5);

      const sample = await specDB.aggregate([

         {
            $match: {
               spec_name: { $regex: search, $options: "i" }
            }
         },

         { $unwind: "$materialDetails" },
         {
            $addFields: {
               "materialDetails.materialObjectId": {
                  $toObjectId: "$materialDetails.material_id"
               }
            }
         },
         {
            $lookup: {
               from: "materials",
               localField: "materialDetails.materialObjectId",
               foreignField: "_id",
               as: "materialData"
            }
         },
         { $unwind: { path: "$materialData", preserveNullAndEmptyArrays: true } },
         {
            $addFields: {
               "materialData.brandObjectId": { $toObjectId: "$materialData.brand_id" },
               "materialData.unitObjectId": { $toObjectId: "$materialData.unit_id" }
            }
         },
         {
            $lookup: {
               from: "brands",
               localField: "materialData.brandObjectId",
               foreignField: "_id",
               as: "materialData.brand_info"
            }
         },
         { $unwind: { path: "$materialData.brand_info", preserveNullAndEmptyArrays: true } },
         {
            $lookup: {
               from: "units",
               localField: "materialData.unitObjectId",
               foreignField: "_id",
               as: "materialData.unit_info"
            }
         },
         { $unwind: { path: "$materialData.unit_info", preserveNullAndEmptyArrays: true } },
         {
            $group: {
               _id: "$_id",
               spec_id: { $first: "$spec_id" },
               spec_name: { $first: "$spec_name" },
               spec_unit: { $first: "$spec_unit" },
               description: { $first: "$description" },
               profit_per: { $first: "$profit_per" },
               additionalExpense_per: { $first: "$additionalExpense_per" },
               createdAt: { $first: "$createdAt" },
               updatedAt: { $first: "$updatedAt" },
               labourDetails: { $first: "$labourDetails" },
               materialDetails: {
                  $push: {
                     material_id: "$materialDetails.material_id",
                     quantity: "$materialDetails.quantity",
                     _id: "$materialDetails._id",
                     material_info: {
                        _id: "$materialData._id",
                        material_name: "$materialData.material_name",
                        rate: "$materialData.rate",
                        brand: "$materialData.brand_info",
                        unit: "$materialData.unit_info"
                     }
                  }
               }
            }
         },
         { $unwind: { path: "$labourDetails", preserveNullAndEmptyArrays: true } },
         {
            $addFields: {
               "labourDetails.labourObjectId": {
                  $toObjectId: "$labourDetails.labour_id"
               }
            }
         },
         {
            $lookup: {
               from: "labour",
               localField: "labourDetails.labourObjectId",
               foreignField: "_id",
               as: "labourData"
            }
         },
         { $unwind: { path: "$labourData", preserveNullAndEmptyArrays: true } },

         {
            $group: {
               _id: "$_id",
               spec_id: { $first: "$spec_id" },
               spec_name: { $first: "$spec_name" },
               spec_unit: { $first: "$spec_unit" },
               description: { $first: "$description" },
               additionalExpense_per:{$first:"$additionalExpense_per"},
               profit_per: { $first: "$profit_per" },
               createdAt: { $first: "$createdAt" },
               updatedAt: { $first: "$updatedAt" },
               materialDetails: { $first: "$materialDetails" },
               labourDetails: {
                  $push: {
                     labour_id: "$labourDetails.labour_id",
                     numberoflabour: "$labourDetails.numberoflabour",
                     _id: "$labourDetails._id",
                     labour_info: {
                        _id: "$labourData._id",
                        labour_type: "$labourData.labour_type",
                        daily_wage: "$labourData.daily_wage"
                     }
                  }
               }
            }
         },
         { $skip: skip },
         { $limit: 5 }
      ]);


      return { result: sample, totalPage };
   }

   async saveSpecData(specId: String, specname: String, specUnit: String, specDescription: String, materialDetails: { material_id: string; quantity: number; }[], labourDetails: { labour_id: string; numberoflabour: number; }[], additionalExpensePer: number, profitPer: number): Promise<void> {
      const newSpec = new specDB({
         spec_id: specId,
         spec_name: specname,
         spec_unit: specUnit,
         description: specDescription,
         materialDetails,
         labourDetails,
         additionalExpense_per: additionalExpensePer,
         profit_per: profitPer

      })
      await newSpec.save()
   }
   async existSpecname(specname: string): Promise<ISpecModelEntity | null> {
      const existData = await specDB.findOne({ spec_name: { $regex: specname, $options: "i" } })
      return existData
   }
   async existSpecId(specId: string): Promise<ISpecModelEntity | null> {
      const existData = await specDB.findOne({ spec_id: { $regex: specId, $options: "i" } })
      return existData
   }
   async editSpecFetch(_id: string): Promise<aggregateSpec[] | null> {
      const specData = await specDB.aggregate([{ $match: { _id: _id } }, { $addFields: { unitObjectId: { $toObjectId: "spec_unit" } } }, {
         $lookup: {
            from: "unit",
            localField: "unitObjectId",
            foreignField: "_id",
            as: "unitDetails"
         }
      }])
      return specData ? specData : null
   }
   async DeleteSpec(_id: string): Promise<void> {
      await specDB.findByIdAndDelete(_id)
   }
   async fetchSpec(): Promise<ISpecModelEntity[]> {
      const x = await specDB.find()
      return x
   }
   async findSpecByMaterialId(_id: string): Promise<ISpecModelEntity | null> {
      const existData = await specDB.findOne({ materialDetails: { $elemMatch: { material_id: _id } } })
      return existData
   }
   async findSpecByLabourId(_id: string): Promise<ISpecModelEntity | null> {
      const existData = await specDB.findOne({ labourDetails: { $elemMatch: { labour_id: _id } } })
      return existData
   }
   async UpdateSpec(_id: string, specId: String, specname: String, specUnit: String, specDescription: String, materialDetails: { material_id: string; quantity: number; }[], labourDetails: { labour_id: string; numberoflabour: number; }[], additionalExpensePer: number, profitPer: number): Promise<void> {
      await specDB.findByIdAndUpdate(_id, {
         spec_id: specId,
         spec_name: specname,
         spec_unit: specUnit,
         description: specDescription,
         materialDetails,
         labourDetails,
         additionalExpense_Per: additionalExpensePer,
         profit_per: profitPer

      })
   }
   async findSpecInEdit(_id: string, spec_id: string): Promise<ISpecModelEntity | null> {
      const specData = await specDB.findOne({ _id: { $ne: _id }, spec_id: { $regex: spec_id, $options: "i" } })
      return specData
   }
   async findSpecInEditByName(_id: string, specname: string): Promise<ISpecModelEntity | null> {
      const specData = await specDB.findOne({ _id: { $ne: _id }, spec_id: { $regex: specname, $options: "i" } })
      return specData
   }
}