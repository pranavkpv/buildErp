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
    estimationAggregatebyLabour,
    estimationAggregatebymaterialbrandunit,
    estimationAggregatebySpec,
    estiomationAggregatebyProject,
    estiomationAggregateByspec,
    saveEstimationInput,
} from '../../application/entities/estimation.entity';
import { IEstimationRepository } from '../../domain/Entities/IRepository/IEstimation';
import { IEstimationAdditionalModalEntity } from '../../domain/Entities/modelEntities/estimationAdditional.entity';


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

        for (const spec of specDetails) {
            let sum = 0;
            const specData = await specDB.findOne({ spec_id: spec.spec_id });

            if (specData) {
                const newEstimation = new estimationDB({
                    spec_id: specData._id,
                    quantity: spec.quantity,
                    unit_rate: spec.unitrate,
                    project_id: projectId,
                    approvalStatus: false,
                    rejectStatus: true,
                });
                await newEstimation.save();
                for (const mat of specData.materialDetails) {
                    const existMaterial = await materialDB.findById(mat.material_id);
                    if (existMaterial) {
                        sum += mat.quantity * spec.quantity * existMaterial.unit_rate;

                        const newEstimationMaterial = new estimationMaterialDB({
                            project_id: projectId,
                            material_id: mat.material_id,
                            quantity: mat.quantity * spec.quantity,
                            unit_rate: existMaterial.unit_rate,
                        });
                        await newEstimationMaterial.save();
                    }
                }
                for (const lab of specData.labourDetails) {
                    const existLabour = await labourDB.findById(lab.labour_id);
                    if (existLabour) {
                        sum += lab.numberoflabour * spec.quantity * existLabour.daily_wage;

                        const newEstimationLabour = new estimationLabourDB({
                            project_id: projectId,
                            labour_id: lab.labour_id,
                            numberoflabour: lab.numberoflabour * spec.quantity,
                            daily_wage: existLabour.daily_wage,
                        });
                        await newEstimationLabour.save();
                    }
                }
                const newEstimationAdditionalModel = new estimationAdditionalDB({
                    additionalExpense_per: specData.additionalExpense_per || 0,
                    additionalExpense_amount: (sum * (specData.additionalExpense_per || 0)) / 100,
                    profit_per: specData.profit_per || 0,
                    profit_amount: ((sum + (sum * (specData.additionalExpense_per || 0)) / 100) * (specData.profit_per || 0)) / 100,
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
                $match: {
                    rejectStatus: true,
                },
            },
            {
                $group: {
                    _id: '$project_id',
                    budgeted_cost: { $sum: { $multiply: ['$quantity', '$unit_rate'] } },
                    reason: { $first: '$reason' },
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
                $match: {
                    rejectStatus: true,
                },
            },
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
    async sendEstimationsByProjectId(projectId: string): Promise<void> {
        await estimationDB.updateMany({ project_id: projectId }, { rejectStatus: false });
    }

    //  Find all estimations for a project
    async getEstimationsByProjectId(projectId: string): Promise<IEstimationModelEntity[]> {
        const data = await estimationDB.find({ project_id: projectId });
        return data;
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
    async saveEstimation(specId: string, projectId: string, unitRate: number, quantity: number):
        Promise<IEstimationModelEntity | null> {
        const newEstimation = new estimationDB({
            project_id: projectId,
            spec_id: specId,
            quantity,
            unit_rate: unitRate,
            approvalStatus: false,
            rejectStatus: true,
        });
        return await newEstimation.save();
    }
    async saveMaterialEstimation(materialId: string, quantity: number, unitRate: number, projectId: string):
        Promise<IEstimationMaterialModelEntity | null> {
        const newMaterialEstimation = new estimationMaterialDB({
            material_id: materialId,
            quantity,
            unit_rate: unitRate,
            project_id: projectId,
        });
        return await newMaterialEstimation.save();
    }
    async saveLabourEstimation(labourId: string, dailyWage: number, numberoflabour: number, projectId: string):
        Promise<IEstimationLabourModelEntity | null> {
        const newLabourEstimation = new estimationLabourDB({
            labour_id: labourId,
            numberoflabour,
            daily_wage: dailyWage,
            project_id: projectId,
        });
        return await newLabourEstimation.save();
    }
    async saveAdditionalEstimation(additionalExpenseAmount: number, additionalExpensePer: number, profitAmount: number, profitPer: number, projectId: string):
        Promise<IEstimationAdditionalModalEntity | null> {
        const newAdditionalEstimation = new estimationAdditionalDB({
            additionalExpense_amount: additionalExpenseAmount,
            additionalExpense_per: additionalExpensePer,
            profit_amount: profitAmount,
            profit_per: profitPer,
            project_id: projectId,
        });
        return await newAdditionalEstimation.save();
    }
    async deleteEstimationsByProjectId(id: string): Promise<void> {
        await estimationDB.deleteMany({ project_id: id });
        await estimationMaterialDB.deleteMany({ project_id: id });
        await estimationLabourDB.deleteMany({ project_id: id });
        await estimationAdditionalDB.deleteMany({ project_id: id });
    }
    async getAggregateEstimationByProject(projectId: string):
        Promise<estimationAggregatebySpec[]> {
        const data = await estimationDB.aggregate([{
            $match: {
                project_id: projectId,
            },
        }, {
            $addFields: {
                specObjectId: { $toObjectId: '$spec_id' },
            },
        }, {
            $lookup: {
                from: 'specs',
                localField: 'specObjectId',
                foreignField: '_id',
                as: 'specDetails',
            },
        }, { $unwind: '$specDetails' }]);
        return data;
    }
    async getAggregateByMaterialBrandUnit(projectId: string):
        Promise<estimationAggregatebymaterialbrandunit[]> {
        const data = await estimationMaterialDB.aggregate([
            {
                $match: {
                    project_id: projectId,
                },
            }, {
                $addFields: {
                    materialObjectId: { $toObjectId: '$material_id' },
                },
            },
            {
                $lookup: {
                    from: 'materials',
                    localField: 'materialObjectId',
                    foreignField: '_id',
                    as: 'materialDetails',
                },
            },
            { $unwind: '$materialDetails' },
            {
                $addFields: {
                    brandObjectId: { $toObjectId: '$materialDetails.brand_id' },
                    unitObjectId: { $toObjectId: '$materialDetails.unit_id' },
                },
            },
            {
                $lookup: {
                    from: 'brands',
                    localField: 'brandObjectId',
                    foreignField: '_id',
                    as: 'brandDetails',
                },
            },
            {
                $lookup: {
                    from: 'units',
                    localField: 'unitObjectId',
                    foreignField: '_id',
                    as: 'unitDetails',
                },
            }, { $unwind: '$unitDetails' }, { $unwind: '$brandDetails' },
        ]);
        return data;
    }
    async getAdditionalExpenseByProject(projectId: string): Promise<IEstimationAdditionalModalEntity[]> {
        return await estimationAdditionalDB.find({ project_id: projectId });
    }
    async getAggregateByLabour(projectId: string): Promise<estimationAggregatebyLabour[]> {
        const data = await estimationLabourDB.aggregate([{
            $match: {
                project_id: projectId,
            },
        }, {
            $addFields: {
                labourObjectId: { $toObjectId: '$labour_id' },
            },
        }, {
            $lookup: {
                from: 'labour',
                localField: 'labourObjectId',
                foreignField: '_id',
                as: 'labourDetails',
            },
        }, {
            $unwind: '$labourDetails',
        }]);
        return data;
    }
    async updateRejectStatusAndReason(projectId: string, reason: string): Promise<void> {
        await estimationDB.updateMany({ project_id: projectId }, { reason, rejectStatus: true });
    }
    async updateEstimationStatus(status: boolean, projectId: string): Promise<void> {
        await estimationDB.updateMany({ project_id: projectId }, { approvalStatus: status });
    }
}
