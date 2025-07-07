import mongoose from "mongoose";
import { IProjectStockRepository } from "../../domain/repositories/IProjectStockRepository";
import { ProjectStock } from "../../domain/types/material";
import ProjectStockModel from "../../models/ProjectStockModel";

export class ProjectStockmongooseRepository implements IProjectStockRepository {
   async saveProjectStock(project_id: string, material_id: string, stock: number): Promise<void> {
      const newProjectWiseStock = new ProjectStockModel({
         project_id,
         material_id,
         stock
      })
      await newProjectWiseStock.save()
   }
   async findProjectStockByMaterialId(material_id: string): Promise<ProjectStock[] | []> {
      const objectId = new mongoose.Types.ObjectId(material_id)
       const projectStockData = await ProjectStockModel.aggregate([{
         $match:{
            material_id:material_id
         }
       },{
         $addFields:{
            projectObjectId:{$toObjectId:"$project_id"}
         }
       },{
           $lookup:{
            from:"project",
            localField:"projectObjectId",
            foreignField:"_id",
            as:"projectDetails"
           }
       }])
     
       return projectStockData ? projectStockData : [] 
   }
   async findProjectStockById(_id: string): Promise<ProjectStock | null> {
      const existProductStock = await ProjectStockModel.findById({_id})
      return existProductStock ? (existProductStock as ProjectStock) : null
   }
   async updateProjectStockById(_id: string, project_id: string, material_id: string, stock: number): Promise<void> {
        await ProjectStockModel.findByIdAndUpdate(_id,{project_id,material_id,stock})
   }
   async deleteProjectStockByMaterialId(material_id: string): Promise<void> {
        await ProjectStockModel.deleteMany({ material_id })
   }
   
}