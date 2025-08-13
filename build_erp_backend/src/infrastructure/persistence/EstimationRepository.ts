import { IEstimationRepositoryEntity } from "../../Entities/repositoryEntities/Estimation-management/IEstimationRepository";
import { rowData, SpecData } from "../../DTO/EstimationEntities/estimation";
import { specDB } from "../../Database/Model/SpecModel";
import { estimationDB } from "../../Database/Model/EstimationModel";
import { materialDB } from "../../Database/Model/MaterialModel";
import { labourDB } from "../../Database/Model/LabourModel";
import { estimationMaterialDB } from "../../Database/Model/EstimationMaterialModel";
import { estimationLabourDB } from "../../Database/Model/EstimationLabourModel";
import { estimationAdditionalDB } from "../../Database/Model/EstimationAdditionalModel";
import { IEstimationModelEntity } from "../../Entities/ModelEntities/Estimation.Entity";
import { IEstimationMaterialModelEntity } from "../../Entities/ModelEntities/EstimationMaterial.Entity";
import { IEstimationLabourModelEntity } from "../../Entities/ModelEntities/EstimationLabour.Entity";
import { listingInput } from "../../DTO/CommonEntities/common";

export class EstimationRepository implements IEstimationRepositoryEntity {

    /**
     * Save estimation details for a given project.
     * This includes spec, material, labour, and additional cost details.
     */
    async saveEstimation(specDetails: rowData[], projectId: string): Promise<void> {
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
    async displaySpec(input: listingInput): Promise<{ data: SpecData[], totalPage: number }> {
        const { page, search } = input;
        const skip = page * 5;

        const data = await estimationDB.aggregate<SpecData>([
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

        const totalDoc = await estimationDB.aggregate<SpecData>([
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
     * Aggregate estimation details by project ID with spec details.
     */
    async AggregateEstimationBySpec(_id: string): Promise<IEstimationModelEntity[]> {
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
