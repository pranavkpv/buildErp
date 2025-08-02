import mongoose from "mongoose";
import { IProjectStockRepository } from "../../Entities/repositoryEntities/Stock-management/IProjectStockRepository";
import { ProjectStock } from "../../Entities/Input-OutputEntities/MaterialEntities/material";
import { projectStockDB } from "../../Database/Model/ProjectStockModel";
import { IProjectStockModelEntity } from "../../Entities/ModelEntities/ProjectStock.Entity";

export class ProjectStockRepository implements IProjectStockRepository {
   async saveProjectStock(project_id: string, material_id: string, stock: number): Promise<void> {
      const newProjectWiseStock = new projectStockDB({
         project_id,
         material_id,
         stock: Number(stock)
      })

      await newProjectWiseStock.save()
   }
   async findProjectStockByMaterialId(material_id: string): Promise<ProjectStock[] | []> {

      const objectId = new mongoose.Types.ObjectId(material_id)
      const projectStockData = await projectStockDB.aggregate(
         [{
            $match: {
               material_id: material_id
            }
         },
         {
            $addFields: {
               projectObjectId: { $toObjectId: "$project_id" },
            }
         }, {
            $lookup: {
               from: "project",
               localField: "projectObjectId",
               foreignField: "_id",
               as: "projectDetails"
            }
         }
         ]
      )

      return projectStockData
   }
   async findProjectStockById(_id: string): Promise<IProjectStockModelEntity | null> {
      const existProductStock = await projectStockDB.findById({ _id })
      return existProductStock
   }
   async updateProjectStockById(_id: string, project_id: string, material_id: string, stock: number): Promise<void> {
      await projectStockDB.findByIdAndUpdate(_id, { project_id, material_id, stock })
   }
   async deleteProjectStockByMaterialId(material_id: string): Promise<void> {
      await projectStockDB.deleteMany({ material_id })
   }
   async IncrementStockById(material_id: string, project_id: string, quantity: number): Promise<void> {
      const exist = await projectStockDB.findOne({ material_id, project_id })
      if (exist) {
         await projectStockDB.findOneAndUpdate({ material_id, project_id }, { $inc: { stock: quantity } })
      } else {
         const newStock = new projectStockDB({
            project_id,
            material_id,
            stock: quantity
         })
         await newStock.save()
      }
   }
   async DecrementStockByID(material_id: string, project_id: string, quantity: number): Promise<void> {
      const exist = await projectStockDB.findOne({ material_id, project_id })
      if (exist) {
         await projectStockDB.findOneAndUpdate({ material_id, project_id }, { $inc: { stock: -quantity } })
      }
   }
   async findProjectStockByProjectAndMaterialId(material_id: string, project_id: string): Promise<number | undefined> {
       const data = await projectStockDB.findOne({material_id,project_id})
       return data?.stock
   }

}