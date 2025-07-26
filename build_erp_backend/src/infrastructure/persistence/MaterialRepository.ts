import mongoose from "mongoose";
import { IMaterialRepository } from "../../Entities/repositoryEntities/Material-management/IMaterialRepository";
import { getMaterialEditData, MaterialList } from "../../Entities/Input-OutputEntities/MaterialEntities/material";
import { materialDB } from "../../Database/Model/MaterialModel";
import { projectDB } from "../../Database/Model/ProjectModel";
import { unitDB } from "../../Database/Model/UnitModel";
import { brandDB } from "../../Database/Model/BrandModel";
import { IProjectModelEntity } from "../../Entities/ModelEntities/ProjectEntity";
import { IMaterialModelEntity } from "../../Entities/ModelEntities/Material.Entity";

export class MaterialRepository implements IMaterialRepository {
   async findAllMaterial(page: number, search: string): Promise<{ getMaterialData: any[]; totalPage: number }> {
      const skip = (page) * 5
      const searchRegex = new RegExp(search, "i");
      const MaterialData = await materialDB.aggregate([
         {
            $addFields: {
               categoryObjectId: { $toObjectId: "$category_id" },
               unitObjectId: { $toObjectId: "$unit_id" },
               brandObjectId: { $toObjectId: "$brand_id" }
            }
         },
         {
            $lookup: {
               from: "categories",
               localField: "categoryObjectId",
               foreignField: "_id",
               as: "categoryDetails"
            }
         },
         {
            $lookup: {
               from: "units",
               localField: "unitObjectId",
               foreignField: "_id",
               as: "unitDetails"
            }
         },
         {
            $lookup: {
               from: "brands",
               localField: "brandObjectId",
               foreignField: "_id",
               as: "brandDetails"
            }
         }, {
            $match: {
               material_name: { $regex: searchRegex }
            }
         }, {
            $skip: skip
         }, { $limit: 5 }])

      const totalPage = await materialDB.countDocuments({material_name:{$regex:searchRegex}}) / 5
      return {
         getMaterialData: MaterialData,
         totalPage
      }
   }

   async findAllProject(): Promise<IProjectModelEntity[] | []> {
      const projectData = await projectDB.find()
      return projectData 
   }

   async findMaterailWithNameCategoryBrand(material_name: string, category_id: string, brand_id: string): Promise<IMaterialModelEntity | null> {
      const existMaterial = await materialDB.findOne({ material_name: { $regex: new RegExp(`^${ material_name }$`, 'i') }, category_id, brand_id })
      return existMaterial 
   }
   async saveMaterial(material_name: string, category_id: string, brand_id: string, unit_id: string, unit_rate: number, stock: number): Promise<IMaterialModelEntity> {
      const newMaterial = new materialDB({
         material_name,
         category_id,
         brand_id,
         unit_id,
         unit_rate,
         stock
      })
      const savedMaterial = await newMaterial.save()
      return savedMaterial
   }
   async findMaterialById(_id: string): Promise<getMaterialEditData | null> {
      const objectId = new mongoose.Types.ObjectId(_id);
      const materialData = await materialDB.aggregate([{
         $match:{
            _id:objectId
         }
      },{
         $addFields:{
            categoryObjectId :{$toObjectId:"$category_id"},
            brandObjectId : {$toObjectId:"$brand_id"},
            unitObjectId:{$toObjectId:"$unit_id"}
         }
      },{
         $lookup:{
            from:"category",
            localField:"categoryObjectId",
            foreignField:"_id",
            as:"categoryDetails"
         }
      },{
          $lookup:{
            from:"brand",
            localField:"brandObjectId",
            foreignField:"_id",
            as:"brandDetails"
         }
      },{
         $lookup:{
            from : "unit",
            localField:"unitObjectId",
            foreignField:"_id",
            as:"unitDetails"
         }
      }])
      return materialData[0] || null;
   }
   async findMaterialInEdit(_id: string, material_name: string, brand_id: string, category_id: string): Promise<IMaterialModelEntity | null> {
      const existMaterial = await materialDB.findOne({ _id: { $ne: _id }, material_name: { $regex: new RegExp(`^${ material_name }$`, 'i') }, category_id, brand_id })
      return existMaterial 
   }
   async updateMaterialById(_id: string, material_name: string, category_id: string, brand_id: string, unit_id: string, unit_rate: number, stock: number): Promise<void> {
      await materialDB.findByIdAndUpdate(_id, { material_name, category_id, brand_id, unit_id, unit_rate, stock })
   }
   async deleteMaterialById(_id: string): Promise<void> {
      await materialDB.findByIdAndDelete(_id);
   }
   async findMaterialByBrandId(brand_id: string): Promise<IMaterialModelEntity | null> {
      const Data = await materialDB.findOne({ brand_id })
      return Data 

   }
   async findMaterialByCategoryId(category_id: string): Promise<IMaterialModelEntity | null> {
      const Data = await materialDB.findOne({ category_id })
      return Data 
   }
   async findMaterialByUnitId(unit_id: string): Promise<IMaterialModelEntity | null> {
      const Data = await materialDB.findOne({ unit_id })
      return Data 
   }
   async findAllUniqueMaterial(): Promise<string[]> {
       const result = await materialDB.distinct("material_name")
       return result 
   }
   async findUnitByMaterialName(material_name: string): Promise<string[]> {
       const result = await materialDB.find({material_name}).distinct("unit_id")
       const exact = await unitDB.find({_id:{$in:result}}).distinct("unit_name")
       return exact
   }
     async findBrandByMaterialName(material_name: string): Promise<string[]> {
       const result = await materialDB.find({material_name}).distinct("brand_id")
       const exact = await brandDB.find({_id:{$in:result}}).distinct("brand_name")
       return exact
   }
   async findUnitRate(material_name:string,brand_name:string,unit_name:string):Promise<IMaterialModelEntity | null>{
      const brandId = await brandDB.findOne({brand_name})
      const unitId = await unitDB.findOne({unit_name})
      const Material = await materialDB.findOne({material_name,brand_id:brandId?._id,unit_id:unitId?._id})
      return Material
   }
   async findSumOfMaterial(materials: { material_id: string; quantity: number; }[]): Promise<number> {
      let sum=0
       for(let element of materials){
           const x = await materialDB.findById(element.material_id)
           if(x){
            sum+=(x.unit_rate * element.quantity)
           }
       }
       return sum
   }
   
}