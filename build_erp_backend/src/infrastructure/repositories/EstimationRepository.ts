import { specDB } from "../../api/models/SpecModel";
import { estimationDB } from "../../api/models/EstimationModel";
import { materialDB } from "../../api/models/MaterialModel";
import { labourDB } from "../../api/models/LabourModel";
import { estimationMaterialDB } from "../../api/models/EstimationMaterialModel";
import { estimationLabourDB } from "../../api/models/EstimationLabourModel";
import { estimationAdditionalDB } from "../../api/models/EstimationAdditionalModel";
import { IEstimationModelEntity } from "../../domain/Entities/modelEntities/estimation.entity";
import { IEstimationMaterialModelEntity } from "../../domain/Entities/modelEntities/estimationMaterial.entity";
import { IEstimationLabourModelEntity } from "../../domain/Entities/modelEntities/estimationLabour.entity";
import { estiomationAggregatebyProject, estiomationAggregateByspec, saveEstimationInput } from "../../application/entities/estimation.entity";
import { IEstimationRepository } from "../../domain/interfaces/Estimation-management/IEstimationRepository";

export class EstimationRepository implements IEstimationRepository {

     /**
     * Aggregate estimation details by project ID with spec details.
     */
    async AggregateEstimationBySpec(_id: string): Promise<estiomationAggregateByspec[]> {
        return await estimationDB.aggregate([
            { $match: { project_id: _id } },
            { $addFields: { specObjectId: { $toObjectId: "$spec_id" } } },
            {
                $lookup: {
                    from: "specs",
                    localField: "specObjectId",
                    foreignField: "_id",
                    as: "specDetails"
                }
            },
            { $unwind: "$specDetails" }
        ]);
    }






    /**
     * Save estimation details for a given project.
     * This includes spec, material, labour, and additional cost details.
     */
    async saveEstimation(specDetails: saveEstimationInput[], projectId: string): Promise<void> {
        let sum = 0;

        for (const char of specDetails) {
            const specData = await specDB.findOne({ spec_id: char.spec_id });

            if (specData) {
                const newEstimation = new estimationDB({
                    spec_id: specData._id,
                    quantity: char.quantity,
                    unit_rate: char.unitrate,
                    project_id: projectId
                });
                await newEstimation.save();

                for (const element of specData.materialDetails) {
                    const existMaterial = await materialDB.findById(element.material_id);
                    if (existMaterial) {
                        sum += element.quantity * existMaterial.unit_rate;

                        const newEstimationMaterial = new estimationMaterialDB({
                            project_id: projectId,
                            material_id: element.material_id,
                            quantity: element.quantity,
                            unit_rate: existMaterial.unit_rate
                        });
                        await newEstimationMaterial.save();
                    }
                }

                for (const x of specData.labourDetails) {
                    const existLabour = await labourDB.findById(x.labour_id);
                    if (existLabour) {
                        sum += x.numberoflabour * existLabour.daily_wage;

                        const newEstimationLabour = new estimationLabourDB({
                            project_id: projectId,
                            labour_id: x.labour_id,
                            numberoflabour: x.numberoflabour,
                            daily_wage: existLabour.daily_wage
                        });
                        await newEstimationLabour.save();
                    }
                }

                const newEstimationAdditionalModel = new estimationAdditionalDB({
                    additionalExpense_per: specData.additionalExpense_per || 0,
                    additionalExpense_amount: (sum * (specData.additionalExpense_per || 0)) / 100,
                    profit_per: specData.profit_per || 0,
                    profit_amount: (sum * (specData.profit_per || 0)) / 100,
                    project_id: projectId
                });
                await newEstimationAdditionalModel.save();
            }
        }
    }

    /**
     * Retrieve paginated and filtered spec estimation data.
     */
    async displaySpec(search: string, page: number): Promise<{ data: estiomationAggregatebyProject[], totalPage: number }> {
        const skip = page * 5;

        const data = await estimationDB.aggregate([
            {
                $group: {
                    _id: "$project_id",
                    budgeted_cost: { $sum: { $multiply: ["$quantity", "$unit_rate"] } }
                }
            },
            {
                $addFields: {
                    projectObjectId: {
                        $cond: {
                            if: { $eq: [{ $type: "$_id" }, "string"] },
                            then: { $toObjectId: "$_id" },
                            else: "$_id"
                        }
                    }
                }
            },
            {
                $lookup: {
                    from: "projects",
                    localField: "projectObjectId",
                    foreignField: "_id",
                    as: "projectDetails"
                }
            },
            { $unwind: "$projectDetails" },
            { $match: { "projectDetails.project_name": { $regex: search, $options: "i" } } },
            { $skip: skip },
            { $limit: 5 }
        ]);

        const totalDoc = await estimationDB.aggregate([
            {
                $group: {
                    _id: "$project_id",
                    budgeted_cost: { $sum: { $multiply: ["$quantity", "$unit_rate"] } }
                }
            },
            {
                $addFields: {
                    projectObjectId: {
                        $cond: {
                            if: { $eq: [{ $type: "$_id" }, "string"] },
                            then: { $toObjectId: "$_id" },
                            else: "$_id"
                        }
                    }
                }
            },
            {
                $lookup: {
                    from: "projects",
                    localField: "projectObjectId",
                    foreignField: "_id",
                    as: "projectDetails"
                }
            },
            { $unwind: "$projectDetails" },
            { $match: { "projectDetails.project_name": { $regex: search, $options: "i" } } }
        ]);

        const totalPage = Math.ceil(totalDoc.length / 5);
        return { data, totalPage };
    }

    /**
     * Delete all estimation-related records for a given project.
     */
    async deleteEstimationById(_id: string): Promise<void> {
        await estimationDB.deleteMany({ project_id: _id });
        await estimationAdditionalDB.deleteMany({ project_id: _id });
        await estimationLabourDB.deleteMany({ project_id: _id });
        await estimationMaterialDB.deleteMany({ project_id: _id });
    }

    /**
     * Find estimation details by project ID.
     */
    async findEstimationByProjectId(projectId: string): Promise<IEstimationModelEntity[] | []> {
        return await estimationDB.find({ project_id: projectId });
    }

    /**
     * Find a single estimation record by spec ID.
     */
    async findEstimationBySpecId(_id: string): Promise<IEstimationModelEntity | null> {
        return await estimationDB.findOne({ spec_id: _id });
    }

   

    /**
     * Retrieve all estimation material records.
     */
    async findAllEstimationMaterial(): Promise<IEstimationMaterialModelEntity[]> {
        return await estimationMaterialDB.find();
    }

    /**
     * Retrieve all estimation labour records.
     */
    async findAllEstimationLabour(): Promise<IEstimationLabourModelEntity[]> {
        return await estimationLabourDB.find();
    }
}
