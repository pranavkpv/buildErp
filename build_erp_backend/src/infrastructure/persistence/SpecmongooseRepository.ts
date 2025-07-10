import { ISpecRepository } from "../../domain/repositories/ISpecRepository";
import { aggregateSpec, Specification } from "../../domain/types/specification";
import SpecModel from "../../models/SpecModel";

export class SpecmongooseRepository implements ISpecRepository {
   async fetchSpecList(page: number, search: string): Promise<{result:Specification[],totalPage:number}> {
      const skip = page * 5;

      const result = await SpecModel.find({
         spec_name: { $regex: search, $options: "i" }
      })
         .skip(skip)
         .limit(5);
         const totalPage = await SpecModel.countDocuments()/5

      return {result :result,totalPage:totalPage}
   }

   async saveSpecData(specId: String, specname: String, specUnit: String, specDescription: String, materialDetails: { material_id: string; quantity: number; }[], labourDetails: { labour_id: string; numberoflabour: number; }[], additionalExpensePer: number, profitPer: number): Promise<void> {
      const newSpec = new SpecModel({
         spec_id: specId,
         spec_name: specname,
         spec_unit: specUnit,
         description: specDescription,
         materialDetails,
         labourDetails,
         additionalExpense_Per: additionalExpensePer,
         profit_per: profitPer

      })
      await newSpec.save()
   }
   async existSpecname(specname: string): Promise<Specification | null> {
      const existData = await SpecModel.findOne({ spec_name: specname })
      return existData ? existData : null
   }
   async existSpecId(specId: string): Promise<Specification | null> {
      const existData = await SpecModel.findOne({ spec_id: specId })
      return existData ? existData : null
   }
   async editSpecFetch(_id: string): Promise<aggregateSpec[] | null> {
      const specData = await SpecModel.aggregate([{$match:{_id:_id}},{$addFields:{unitObjectId:{$toObjectId:"spec_unit"}}},{$lookup:{
         from:"unit",
         localField:"unitObjectId",
         foreignField:"_id",
         as:"unitDetails"
      }}])
      return specData ? specData : null
   }
    async DeleteSpec(_id: string): Promise<void> {
        await SpecModel.findByIdAndDelete(_id)
    }
    async fetchSpec(): Promise<Specification[]> {
       const x = await SpecModel.find()
       return x
    }
    async findSpecByMaterialId(_id: string): Promise<Specification | null> {
        const existData = await SpecModel.findOne({materialDetails:{$elemMatch:{material_id:_id}}})
        return existData ? existData : null
    }
    async findSpecByLabourId(_id: string): Promise<Specification | null> {
         const existData = await SpecModel.findOne({labourDetails:{$elemMatch:{labour_id:_id}}})
        return existData ? existData : null
    }
    
}