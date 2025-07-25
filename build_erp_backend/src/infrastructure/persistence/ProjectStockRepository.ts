import mongoose from "mongoose";
import { IProjectStockRepository } from "../../Entities/repositoryEntities/Stock-management/IProjectStockRepository";
import { ProjectStock } from "../../Entities/Input-OutputEntities/MaterialEntities/material";
import { projectDB } from "../../Database/Model/ProjectModel";
import { projectStockDB } from "../../Database/Model/ProjectStockModel";
import { IProjectStockModelEntity } from "../../Entities/ModelEntities/ProjectStock.Entity";

export class ProjectStockRepository implements IProjectStockRepository {
   async saveProjectStock(project_id: string, material_id: string, stock: number): Promise<void> {
      const newProjectWiseStock = new projectDB({
         project_id,
         material_id,
         stock
      })
      await newProjectWiseStock.save()
   }
   async findProjectStockByMaterialId(material_id: string): Promise<ProjectStock[] | []> {
      const objectId = new mongoose.Types.ObjectId(material_id)
       const projectStockData = await projectDB.aggregate([{
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
     
       return projectStockData 
   }
   async findProjectStockById(_id: string): Promise<IProjectStockModelEntity | null> {
      const existProductStock = await projectStockDB.findById({_id})
      return existProductStock 
   }
   async updateProjectStockById(_id: string, project_id: string, material_id: string, stock: number): Promise<void> {
        await projectStockDB.findByIdAndUpdate(_id,{project_id,material_id,stock})
   }
   async deleteProjectStockByMaterialId(material_id: string): Promise<void> {
        await projectStockDB.deleteMany({ material_id })
   }
   
}