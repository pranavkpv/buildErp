import { IProjectStockRepository } from '../../domain/Entities/IRepository/IProjectStock';
import { projectStockDB } from '../../api/models/ProjectStockModel';
import { IProjectStockModelEntity } from '../../domain/Entities/modelEntities/projectStock.entity';
import { addProjectStockInput } from '../../application/Entities/material.entity';
import { incrementStockInput, projectStockInput, ProjectStockOutput } from '../../application/Entities/project.entity';

export class ProjectStockRepository implements IProjectStockRepository {

    // Create a new project stock entry
    async createProjectStock(input: addProjectStockInput): Promise<void> {
        const { project_id, material_id, stock } = input;

        const newProjectStock = new projectStockDB({
            project_id,
            material_id,
            stock: Number(stock),
        });

        await newProjectStock.save();
    }

    // Get stock details by material ID
    async getProjectStockByMaterialId(materialId: string): Promise<ProjectStockOutput[]> {
        const projectStockData = await projectStockDB.aggregate([
            {
                $match: { materialId },
            },
            {
                $addFields: {
                    projectObjectId: { $toObjectId: '$project_id' },
                },
            },
            {
                $lookup: {
                    from: 'project',
                    localField: 'projectObjectId',
                    foreignField: '_id',
                    as: 'projectDetails',
                },
            },
        ]);

        return projectStockData;
    }

    // Get stock details by stock ID
    async getProjectStockById(id: string): Promise<IProjectStockModelEntity | null> {
        return await projectStockDB.findById({ id });
    }

    // Update stock details by stock ID
    async updateProjectStock(input: projectStockInput): Promise<void> {
        const { _id, project_id, material_id, stock } = input;
        await projectStockDB.findByIdAndUpdate(_id, { project_id, material_id, stock });
    }

    // Delete stock entries by material ID
    async deleteProjectStockByMaterialId(materialId: string): Promise<void> {
        await projectStockDB.deleteMany({ material_id: materialId });
    }

    // Increase stock by project & material
    async increaseStock(input: incrementStockInput): Promise<void> {
        const { material_id, project_id, quantity } = input;

        const existingStock = await projectStockDB.findOne({ material_id, project_id });

        if (existingStock) {
            await projectStockDB.findOneAndUpdate(
                { material_id, project_id },
                { $inc: { stock: quantity } },
            );
        } else {
            const newStock = new projectStockDB({
                project_id,
                material_id,
                stock: quantity,
            });
            await newStock.save();
        }
    }

    // Decrease stock by project & material
    async decreaseStock(input: incrementStockInput): Promise<void> {
        const { material_id, project_id, quantity } = input;

        if (!quantity) return;

        const existingStock = await projectStockDB.findOne({ material_id, project_id });

        if (existingStock) {
            await projectStockDB.findOneAndUpdate(
                { material_id, project_id },
                { $inc: { stock: -quantity } },
            );
        }
    }

    // Get stock count for project & material
    async getStockQuantityByProjectAndMaterial(input: incrementStockInput): Promise<number | undefined> {
        const { material_id, project_id } = input;
        const data = await projectStockDB.findOne({ material_id, project_id });
        return data?.stock;
    }
}
