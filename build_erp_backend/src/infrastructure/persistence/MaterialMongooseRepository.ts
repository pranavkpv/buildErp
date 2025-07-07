import mongoose from "mongoose";
import { IMaterialRepository } from "../../domain/repositories/IMaterialRepository";
import { Brand } from "../../domain/types/brand";
import { Category } from "../../domain/types/category";
import { getMaterialEditData, Material, MaterialList } from "../../domain/types/material";
import { Project } from "../../domain/types/project";
import { Unit } from "../../domain/types/unit";
import BrandModel from "../../models/BrandModel";
import CategoryModel from "../../models/CategoryModel";
import MaterialModel from "../../models/MaterialModel";
import ProjectModel from "../../models/ProjectModel";
import UnitModel from "../../models/UnitModel";

export class MaterialmongooseRepository implements IMaterialRepository {
   async findAllMaterial(page: number, search: string): Promise<{ getMaterialData: any[]; totalPage: number }> {
      const skip = (page) * 5
      const searchRegex = new RegExp(search, "i");
      const MaterialData = await MaterialModel.aggregate([
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

      const totalPage = await MaterialModel.countDocuments() / 5
      return {
         getMaterialData: MaterialData,
         totalPage
      }
   }
   async findAllProject(): Promise<Project[] | []> {
      const projectData = await ProjectModel.find()
      return projectData ? (projectData as Project[]) : []
   }
   async findMaterailWithNameCategoryBrand(material_name: string, category_id: string, brand_id: string): Promise<MaterialList | null> {
      const existMaterial = await MaterialModel.findOne({ material_name: { $regex: new RegExp(`^${ material_name }$`, 'i') }, category_id, brand_id })
      return existMaterial ? existMaterial : null
   }
   async saveMaterial(material_name: string, category_id: string, brand_id: string, unit_id: string, unit_rate: number, stock: number): Promise<MaterialList> {
      const newMaterial = new MaterialModel({
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
      const materialData = await MaterialModel.aggregate([{
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
   async findMaterialInEdit(_id: string, material_name: string, brand_id: string, category_id: string): Promise<MaterialList | null> {
      const existMaterial = await MaterialModel.findOne({ _id: { $ne: _id }, material_name: { $regex: new RegExp(`^${ material_name }$`, 'i') }, category_id, brand_id })
      return existMaterial ? (existMaterial as MaterialList) : null
   }
   async updateMaterialById(_id: string, material_name: string, category_id: string, brand_id: string, unit_id: string, unit_rate: number, stock: number): Promise<void> {
      await MaterialModel.findByIdAndUpdate(_id, { material_name, category_id, brand_id, unit_id, unit_rate, stock })
   }
   async deleteMaterialById(_id: string): Promise<void> {
      await MaterialModel.findByIdAndDelete(_id);
   }
   async findMaterialByBrandId(brand_id: string): Promise<MaterialList | null> {
      const Data = await MaterialModel.findOne({ brand_id })
      return Data ? Data : null

   }
   async findMaterialByCategoryId(category_id: string): Promise<MaterialList | null> {
      const Data = await MaterialModel.findOne({ category_id })
      return Data ? Data : null
   }
   async findMaterialByUnitId(unit_id: string): Promise<MaterialList | null> {
      const Data = await MaterialModel.findOne({ unit_id })
      return Data ? Data : null
   }
   async findAllUniqueMaterial(): Promise<string[]> {
       const result = await MaterialModel.distinct("material_name")
       return result 
   }
   async findUnitByMaterialName(material_name: string): Promise<string[]> {
       const result = await MaterialModel.find({material_name}).distinct("unit_id")
       const exact = await UnitModel.find({_id:{$in:result}}).distinct("unit_name")
       return exact
   }
     async findBrandByMaterialName(material_name: string): Promise<string[]> {
       const result = await MaterialModel.find({material_name}).distinct("brand_id")
       const exact = await BrandModel.find({_id:{$in:result}}).distinct("brand_name")
       return exact
   }
   async findUnitRate(material_name:string,brand_name:string,unit_name:string):Promise<MaterialList | null>{
      const brandId = await BrandModel.findOne({brand_name})
      const unitId = await UnitModel.findOne({unit_name})
      const Material = await MaterialModel.findOne({material_name,brand_id:brandId?._id,unit_id:unitId?._id})
      return Material
   }
   async findSumOfMaterial(materials: { material_id: string; quantity: number; }[]): Promise<number> {
      let sum=0
       for(let element of materials){
           const x = await MaterialModel.findById(element.material_id)
           if(x){
            sum+=(x.unit_rate * element.quantity)
           }
       }
       return sum
   }
   
}