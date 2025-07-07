import { IUnitRepository } from "../../domain/repositories/IUnitRepository";
import { Unit } from "../../domain/types/unit";
import UnitModel from "../../models/UnitModel";

export class UnitMongooseRepository implements IUnitRepository {
   async findUnit(): Promise<Unit[] | []> {
      const existUnit = await UnitModel.find({})
      return existUnit ? (existUnit as Unit[]) : []
   }
   async findUnitByunit_name(unit_name: string): Promise<Unit | null> {
      const ExistData = await UnitModel.findOne({ unit_name:{$regex:new RegExp(`${unit_name}$`,"i")} })
      return ExistData ? (ExistData as Unit) : null
   }
   async saveUnit(unit_name: string, short_name: string): Promise<void> {
      const newUnit = new UnitModel({
         unit_name,
         short_name
      })
      await newUnit.save()
   }
   async findUnitInEdit(_id: string, unit_name: string): Promise<Unit | null> {
      const existData = await UnitModel.findOne({ _id: { $ne: _id }, unit_name: {$regex:new RegExp(`${unit_name}$`,"i")} })
      return existData ? (existData as Unit) : null
   }
   async updateUnitById(_id: string, unit_name: string, short_name: string): Promise<void> {
      await UnitModel.findByIdAndUpdate(_id, { unit_name, short_name })
   }
   async deleteUnitById(_id: string): Promise<void> {
      await UnitModel.findByIdAndDelete(_id)
   }
   async findAllListUnit(page: number, search: string): Promise<{ getUnitData: any[]; totalPage: number; }> {
      const skip = (page) * 5
      const searchRegex = new RegExp(search, "i");
      const brandList = await UnitModel.find({ unit_name: { $regex: searchRegex } }).skip(skip).limit(5)
      const totalPage = await UnitModel.countDocuments() / 5
      return {
         getUnitData: brandList,
         totalPage
      }
   }
}