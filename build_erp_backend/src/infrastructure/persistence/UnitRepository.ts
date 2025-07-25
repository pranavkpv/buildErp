
import { IUnitRepository } from "../../Entities/repositoryEntities/Material-management/IUnitRepository";
import { Unit } from "../../Entities/Input-OutputEntities/MaterialEntities/unit";
import { unitDB } from "../../Database/Model/UnitModel";
import { IUnitModelEntity } from "../../Entities/ModelEntities/Unit.Entity";


export class UnitRepository implements IUnitRepository {
   async findUnit(): Promise<IUnitModelEntity[] | []> {
      const existUnit = await unitDB.find({})
      return existUnit 
   }
   async findUnitByunit_name(unit_name: string): Promise<IUnitModelEntity | null> {
      const ExistData = await unitDB.findOne({ unit_name:{$regex:new RegExp(`${unit_name}$`,"i")} })
      return ExistData 
   }
   async saveUnit(unit_name: string, short_name: string): Promise<void> {
      const newUnit = new unitDB({
         unit_name,
         short_name
      })
      await newUnit.save()
   }
   async findUnitInEdit(_id: string, unit_name: string): Promise<IUnitModelEntity | null> {
      const existData = await unitDB.findOne({ _id: { $ne: _id }, unit_name: {$regex:new RegExp(`${unit_name}$`,"i")} })
      return existData 
   }
   async updateUnitById(_id: string, unit_name: string, short_name: string): Promise<void> {
      await unitDB.findByIdAndUpdate(_id, { unit_name, short_name })
   }
   async deleteUnitById(_id: string): Promise<void> {
      await unitDB.findByIdAndDelete(_id)
   }
   async findAllListUnit(page: number, search: string): Promise<{ getUnitData: any[]; totalPage: number; }> {
      const skip = (page) * 5
      const searchRegex = new RegExp(search, "i");
      const brandList = await unitDB.find({ unit_name: { $regex: searchRegex } }).skip(skip).limit(5)
      const totalPage = await unitDB.countDocuments() / 5
      return {
         getUnitData: brandList,
         totalPage
      }
   }
}