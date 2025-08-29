import { specDB } from '../../api/models/SpecModel';
import { estimationDB } from '../../api/models/EstimationModel';
import { materialDB } from '../../api/models/MaterialModel';
import { labourDB } from '../../api/models/LabourModel';
import { estimationMaterialDB } from '../../api/models/EstimationMaterialModel';
import { estimationLabourDB } from '../../api/models/EstimationLabourModel';
import { estimationAdditionalDB } from '../../api/models/EstimationAdditionalModel';
import { IEstimationModelEntity } from '../../domain/Entities/modelEntities/estimation.entity';
import { IEstimationMaterialModelEntity } from '../../domain/Entities/modelEntities/estimationMaterial.entity';
import { IEstimationLabourModelEntity } from '../../domain/Entities/modelEntities/estimationLabour.entity';
import {
    estiomationAggregatebyProject,
    estiomationAggregateByspec,
    saveEstimationInput,
} from '../../application/Entities/estimation.entity';
import { IEstimationRepository } from '../../domain/Entities/IRepository/IEstimation';

export class EstimationRepository implements IEstimationRepository {

    //  Get all estimations grouped by Spec for a given project
    async getEstimationsGroupedBySpec(projectId: string): Promise<estiomationAggregateByspec[]> {
        return await estimationDB.aggregate([
            { $match: { project_id: projectId } },
            { $addFields: { specObjectId: { $toObjectId: '$spec_id' } } },
            {
                $lookup: {
                    from: 'specs',
                    localField: 'specObjectId',
                    foreignField: '_id',
                    as: 'specDetails',
                },
            },
            { $unwind: '$specDetails' },
        ]);
    }

    //  Create and persist full estimation (spec, material, labour, additional)
    async createEstimation(specDetails: saveEstimationInput[], projectId: string): Promise<void> {
        let sum = 0;

        for (const spec of specDetails) {
            const specData = await specDB.findOne({ spec_id: spec.spec_id });

            if (specData) {
                const newEstimation = new estimationDB({
                    spec_id: specData._id,
                    quantity: spec.quantity,
                    unit_rate: spec.unitrate,
                    project_id: projectId,
                });
                await newEstimation.save();
                for (const mat of specData.materialDetails) {
                    const existMaterial = await materialDB.findById(mat.material_id);
                    if (existMaterial) {
                        sum += mat.quantity * existMaterial.unit_rate;

                        const newEstimationMaterial = new estimationMaterialDB({
                            project_id: projectId,
                            material_id: mat.material_id,
                            quantity: mat.quantity,
                            unit_rate: existMaterial.unit_rate,
                        });
                        await newEstimationMaterial.save();
                    }
                }
                for (const lab of specData.labourDetails) {
                    const existLabour = await labourDB.findById(lab.labour_id);
                    if (existLabour) {
                        sum += lab.numberoflabour * existLabour.daily_wage;

                        const newEstimationLabour = new estimationLabourDB({
                            project_id: projectId,
                            labour_id: lab.labour_id,
                            numberoflabour: lab.numberoflabour,
                            daily_wage: existLabour.daily_wage,
                        });
                        await newEstimationLabour.save();
                    }
                }
                const newEstimationAdditionalModel = new estimationAdditionalDB({
                    additionalExpense_per: specData.additionalExpense_per || 0,
                    additionalExpense_amount: (sum * (specData.additionalExpense_per || 0)) / 100,
                    profit_per: specData.profit_per || 0,
                    profit_amount: (sum * (specData.profit_per || 0)) / 100,
                    project_id: projectId,
                });
                await newEstimationAdditionalModel.save();
            }
        }
    }

    //  Get paginated estimations grouped by Project
    async getEstimationsGroupedByProject(
        search: string,
        page: number,
    ): Promise<{ data: estiomationAggregatebyProject[]; totalPage: number }> {
        const skip = page * 5;

        const data = await estimationDB.aggregate([
            {
                $group: {
                    _id: '$project_id',
                    budgeted_cost: { $sum: { $multiply: ['$quantity', '$unit_rate'] } },
                },
            },
            {
                $addFields: {
                    projectObjectId: {
                        $cond: {
                            if: { $eq: [{ $type: '$_id' }, 'string'] },
                            then: { $toObjectId: '$_id' },
                            else: '$_id',
                        },
                    },
                },
            },
            {
                $lookup: {
                    from: 'projects',
                    localField: 'projectObjectId',
                    foreignField: '_id',
                    as: 'projectDetails',
                },
            },
            { $unwind: '$projectDetails' },
            { $match: { 'projectDetails.project_name': { $regex: search, $options: 'i' } } },
            { $skip: skip },
            { $limit: 5 },
        ]);

        const totalDoc = await estimationDB.aggregate([
            {
                $group: {
                    _id: '$project_id',
                    budgeted_cost: { $sum: { $multiply: ['$quantity', '$unit_rate'] } },
                },
            },
            {
                $addFields: {
                    projectObjectId: {
                        $cond: {
                            if: { $eq: [{ $type: '$_id' }, 'string'] },
                            then: { $toObjectId: '$_id' },
                            else: '$_id',
                        },
                    },
                },
            },
            {
                $lookup: {
                    from: 'projects',
                    localField: 'projectObjectId',
                    foreignField: '_id',
                    as: 'projectDetails',
                },
            },
            { $unwind: '$projectDetails' },
            { $match: { 'projectDetails.project_name': { $regex: search, $options: 'i' } } },
        ]);

        const totalPage = Math.ceil(totalDoc.length / 5);
        return { data, totalPage };
    }

    // Delete all estimations for a project
    async deleteEstimationsByProjectId(projectId: string): Promise<void> {
        await estimationDB.deleteMany({ project_id: projectId });
        await estimationAdditionalDB.deleteMany({ project_id: projectId });
        await estimationLabourDB.deleteMany({ project_id: projectId });
        await estimationMaterialDB.deleteMany({ project_id: projectId });
    }

    //  Find all estimations for a project
    async getEstimationsByProjectId(projectId: string): Promise<IEstimationModelEntity[]> {
        return await estimationDB.find({ project_id: projectId });
    }

    //  Find estimation by SpecId
    async getEstimationBySpecId(specId: string): Promise<IEstimationModelEntity | null> {
        return await estimationDB.findOne({ spec_id: specId });
    }

    //  Get all estimation material details
    async getAllEstimationMaterials(): Promise<IEstimationMaterialModelEntity[]> {
        return await estimationMaterialDB.find();
    }

    //  Get all estimation labour details
    async getAllEstimationLabours(): Promise<IEstimationLabourModelEntity[]> {
        return await estimationLabourDB.find();
    }
}
