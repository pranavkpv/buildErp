import { ILabourRepository } from "../../Entities/repositoryEntities/Labour-management/ILabourRepository";
import { labourDB } from "../../Database/Model/LabourModel";
import { ILabourModelEntity } from "../../Entities/ModelEntities/Labour.Entity";


export class LabourRepository implements ILabourRepository {
   async findAllLabour(page:number,search:string): Promise<{getLabourData:any[];totalPage:number }> {
      const skip = (page) * 5
      const searchRegex = new RegExp(search, "i");
      const labourList = await labourDB.find({labour_type:{$regex:searchRegex}}).skip(skip).limit(5)
      const totalPage = await labourDB.countDocuments()/5
      return {
         getLabourData:labourList,
         totalPage
      }
   }
   async findLabourByType(labour_type: string): Promise<ILabourModelEntity | null> {
      const existLabour = await labourDB.findOne({ labour_type:{$regex:new RegExp(`^${labour_type}$`,"i")} })
      return existLabour 
   }
   async saveLabour(labour_type: string, daily_wage: number): Promise<void> {
      const newLabour = new labourDB({
         labour_type,
         daily_wage
      })
      await newLabour.save()
   }
   async deleteLabourById(_id: string): Promise<void> {
      await labourDB.findByIdAndDelete(_id)
   }
   async findLabourInEdit(_id: string, labour_type: string): Promise<ILabourModelEntity | null> {
      const existLabour = await labourDB.findOne({ _id: { $ne: _id }, labour_type:{$regex:new RegExp(`^${labour_type}$`,"i")} })
      return existLabour 
   }
   async updateLabourById(_id: string, labour_type: string, daily_wage: number): Promise<void> {
      await labourDB.findByIdAndUpdate(_id, {
         labour_type, daily_wage
      })
   }
   async fetchLabourData():Promise<ILabourModelEntity[] | []>{
      const labourData = await labourDB.find()
      return labourData 
   } 
   async findLabourById(_id: string): Promise<ILabourModelEntity | null> {
       const labours = await labourDB.findById(_id)
       return labours
   }
   async findSumofLabouor(labours: { labour_id: string; numberoflabour: number; }[]): Promise<number> {
        let sum=0
       for(let element of labours){
           const x = await labourDB.findById(element.labour_id)
           if(x){
            sum+=(x.daily_wage * element.numberoflabour)
           }
       }
       return sum
   }
}