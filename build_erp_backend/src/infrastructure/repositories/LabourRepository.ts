import { ILabourRepository } from "../../domain/interfaces/Labour-management/ILabourRepository";
import { labourDB } from "../../api/models/LabourModel";
import { ILabourModelEntity } from "../../domain/Entities/modelEntities/labour.entity";
import { labourAddInput, labourEditInput, labourSumInput } from "../../application/entities/labour.entity";
import { listingInput } from "../../application/entities/common.entity";

export class LabourRepository implements ILabourRepository {

   async findSumofLabouor(input:labourSumInput[]): Promise<number> {
      let sum = 0;
      for (const element of input) {
         const labour = await labourDB.findById(element.labour_id);
         if (labour) {
            sum += labour.daily_wage * element.numberoflabour;
         }
      }
      return sum;
   }

   

   async findAllLabour(input: listingInput): Promise<{data:ILabourModelEntity[],totalPage:number}> {
      const { page, search } = input;
      const skip = page * 5;
      const searchRegex = new RegExp(search, "i");

      const labourList = await labourDB
         .find({ labour_type: { $regex: searchRegex } })
         .skip(skip)
         .limit(5);

      const totalPage = await labourDB.countDocuments({ labour_type: { $regex: searchRegex } }) / 5;

      return {
         data: labourList,
         totalPage
      };
   }

   async findLabourByType(labour_type: string): Promise<ILabourModelEntity | null> {
      return await labourDB.findOne({ labour_type: { $regex: new RegExp(`^${ labour_type }$`, "i") } });
   }

   async saveLabour(input: labourAddInput): Promise<void> {
      const { labour_type, daily_wage } = input;
      const newLabour = new labourDB({ labour_type, daily_wage });
      await newLabour.save();
   }


   async deleteLabourById(_id: string): Promise<void> {
      await labourDB.findByIdAndDelete(_id);
   }

   async findLabourInEdit(_id:string,labour_type:string): Promise<ILabourModelEntity | null> {
      return await labourDB.findOne({
         _id: { $ne: _id },
         labour_type: { $regex: new RegExp(`^${ labour_type }$`, "i") }
      });
   }

   async updateLabourById(input: labourEditInput): Promise<void> {
      const { _id, labour_type, daily_wage } = input;
      await labourDB.findByIdAndUpdate(_id, { labour_type, daily_wage });
   }


   async fetchLabourData(): Promise<ILabourModelEntity[] | []> {
      return await labourDB.find();
   }

   async findLabourById(_id: string): Promise<ILabourModelEntity | null> {
      return await labourDB.findById(_id);
   }


}
