import mongoose from "mongoose";
import { IProjectStockRepositoryEntity } from "../../Entities/repositoryEntities/Stock-management/IProjectStockRepository";
import { ProjectStock } from "../../DTO/MaterialEntities/material";
import { projectStockDB } from "../../Database/Model/ProjectStockModel";
import { IProjectStockModelEntity } from "../../Entities/ModelEntities/ProjectStock.Entity";
import { 
    addProjectStockInput, 
    editprojectstockInput, 
    incrementStockInput 
} from "../../DTO/StockEntities/projectstock";

export class ProjectStockRepository implements IProjectStockRepositoryEntity {

    /**
     * Save new project stock entry
     */
    async saveProjectStock(input: addProjectStockInput): Promise<void> {
        const { project_id, material_id, stock } = input;

        const newProjectStock = new projectStockDB({
            project_id,
            material_id,
            stock: Number(stock)
        });

        await newProjectStock.save();
    }

    /**
     * Get all project stock records by material ID
     */
    async findProjectStockByMaterialId(material_id: string): Promise<ProjectStock[]> {
        const projectStockData = await projectStockDB.aggregate([
            {
                $match: { material_id }
            },
            {
                $addFields: {
                    projectObjectId: { $toObjectId: "$project_id" }
                }
            },
            {
                $lookup: {
                    from: "project",
                    localField: "projectObjectId",
                    foreignField: "_id",
                    as: "projectDetails"
                }
            }
        ]);

        return projectStockData;
    }

    /**
     * Find project stock by document ID
     */
    async findProjectStockById(_id: string): Promise<IProjectStockModelEntity | null> {
        return await projectStockDB.findById({ _id });
    }

    /**
     * Update project stock by document ID
     */
    async updateProjectStockById(input: editprojectstockInput): Promise<void> {
        const { _id, project_id, material_id, stock } = input;
        await projectStockDB.findByIdAndUpdate(_id, { project_id, material_id, stock });
    }

    /**
     * Delete all stock records for a material ID
     */
    async deleteProjectStockByMaterialId(material_id: string): Promise<void> {
        await projectStockDB.deleteMany({ material_id });
    }

    /**
     * Increment stock quantity for a given material & project
     */
    async IncrementStockById(input: incrementStockInput): Promise<void> {
        const { material_id, project_id, quantity } = input;

        const existingStock = await projectStockDB.findOne({ material_id, project_id });

        if (existingStock) {
            await projectStockDB.findOneAndUpdate(
                { material_id, project_id },
                { $inc: { stock: quantity } }
            );
        } else {
            const newStock = new projectStockDB({
                project_id,
                material_id,
                stock: quantity
            });
            await newStock.save();
        }
    }

    /**
     * Decrement stock quantity for a given material & project
     */
    async DecrementStockByID(input: incrementStockInput): Promise<void> {
        const { material_id, project_id, quantity } = input;

        if (!quantity) return;

        const existingStock = await projectStockDB.findOne({ material_id, project_id });

        if (existingStock) {
            await projectStockDB.findOneAndUpdate(
                { material_id, project_id },
                { $inc: { stock: -quantity } }
            );
        }
    }

    /**
     * Get stock quantity by material & project ID
     */
    async findProjectStockByProjectAndMaterialId(input: incrementStockInput): Promise<number | undefined> {
        const { material_id, project_id } = input;
        const data = await projectStockDB.findOne({ material_id, project_id });
        return data?.stock;
    }
}
