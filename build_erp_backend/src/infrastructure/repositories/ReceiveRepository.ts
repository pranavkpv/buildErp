import { receiveDB } from "../../api/models/ReceiveModel";
import { RecieveOutput } from "../../application/dto/receive.dto";
import { ReceiveInput } from "../../application/entities/receive.entity";
import { IReceiveModelEntity } from "../../domain/Entities/modelEntities/recieve.entity";
import { IReceiveRepository } from "../../domain/interfaces/Purchase-management/IReceiveRepository";

/**
 * Repository class for managing Receive operations in the database.
 */
export class ReceiveRepository implements IReceiveRepository {

    /**
     * Save new receive entry.
     */
    async saveReceive(input: ReceiveInput): Promise<boolean> {
        const { project_id, date, description, materialDetails, transferId } = input;

        const newRecieveData = new receiveDB({
            approval_status: false,
            date,
            description,
            materialDetails,
            project_id,
            transfer_id: transferId
        });

        await newRecieveData.save();
        return true;
    }

    /**
     * Get receive data with search and pagination.
     */
    async getReceive(search: string, page: number): Promise<{data:RecieveOutput[],totalPage:number}> {
        const receiveData = await receiveDB.aggregate([
            // Convert project_id to ObjectId for lookup
            { $addFields: { projectObjectId: { $toObjectId: "$project_id" } } },

            // Join with project details
            {
                $lookup: {
                    from: "projects",
                    localField: "projectObjectId",
                    foreignField: "_id",
                    as: "projectDetails"
                }
            },
            { $unwind: "$projectDetails" },

            // Filter by search term and pending approval
            { $match: { "projectDetails.project_name": { $regex: search, $options: "i" }, approval_status: false } },

            // Calculate total amount per record
            {
                $addFields: {
                    net_amount: {
                        $sum: {
                            $map: {
                                input: "$materialDetails",
                                as: "mat",
                                in: { $multiply: ["$$mat.quantity", "$$mat.unit_rate"] }
                            }
                        }
                    }
                }
            },

            // Material details join
            { $unwind: "$materialDetails" },
            { $addFields: { "materialDetails.materialObjectId": { $toObjectId: "$materialDetails.material_id" } } },
            {
                $lookup: {
                    from: "materials",
                    localField: "materialDetails.materialObjectId",
                    foreignField: "_id",
                    as: "materialDetails.materialInfo"
                }
            },
            { $unwind: "$materialDetails.materialInfo" },

            // Brand & Unit join
            {
                $addFields: {
                    "materialDetails.brandObjectId": { $toObjectId: "$materialDetails.materialInfo.brand_id" },
                    "materialDetails.unitObjectId": { $toObjectId: "$materialDetails.materialInfo.unit_id" }
                }
            },
            {
                $lookup: {
                    from: "brands",
                    localField: "materialDetails.brandObjectId",
                    foreignField: "_id",
                    as: "materialDetails.brandInfo"
                }
            },
            { $unwind: "$materialDetails.brandInfo" },
            {
                $lookup: {
                    from: "units",
                    localField: "materialDetails.unitObjectId",
                    foreignField: "_id",
                    as: "materialDetails.unitInfo"
                }
            },
            { $unwind: "$materialDetails.unitInfo" },

            // Transfer details join
            { $unwind: "$transfer_id" },
            { $addFields: { transferObjectId: { $toObjectId: "$transfer_id" } } },
            {
                $lookup: {
                    from: "transfers",
                    localField: "transferObjectId",
                    foreignField: "_id",
                    as: "transferDetails"
                }
            },
            { $unwind: "$transferDetails" },
            { $addFields: { "transferDetails.fromprojectObjectId": { $toObjectId: "$transferDetails.from_project_id" } } },
            {
                $lookup: {
                    from: "projects",
                    localField: "transferDetails.fromprojectObjectId",
                    foreignField: "_id",
                    as: "fromProjectDetails"
                }
            },
            { $unwind: "$fromProjectDetails" },

            // Group data
            {
                $group: {
                    _id: "$_id",
                    project_id: { $first: "$project_id" },
                    Toproject_name: { $first: "$projectDetails.project_name" },
                    date: { $first: "$date" },
                    finalAmount: { $first: "$net_amount" },
                    materialData: {
                        $push: {
                            material_name: "$materialDetails.materialInfo.material_name",
                            material_id: "$materialDetails.materialInfo._id",
                            brand_name: "$materialDetails.brandInfo.brand_name",
                            unit_name: "$materialDetails.unitInfo.unit_name",
                            quantity: "$materialDetails.quantity",
                            unit_rate: "$materialDetails.unit_rate"
                        }
                    },
                    transferDetails: {
                        $push: {
                            _id: "$transferDetails._id",
                            date: "$transferDetails.date",
                            fromproject_name: "$fromProjectDetails.project_name",
                            transfer_id: "$transferDetails.transfer_id",
                            finalAmount: {
                                $sum: {
                                    $map: {
                                        input: "$transferDetails.materialDetails",
                                        as: "mat",
                                        in: { $multiply: ["$$mat.quantity", "$$mat.unit_rate"] }
                                    }
                                }
                            }
                        }
                    }
                }
            },

            // Pagination
            { $skip: page * 5 },
            { $limit: 5 }
        ]);

        // Count total documents for pagination
        const totalData = await receiveDB.aggregate([
            { $addFields: { projectObjectId: { $toObjectId: "$project_id" } } },
            {
                $lookup: {
                    from: "projects",
                    localField: "projectObjectId",
                    foreignField: "_id",
                    as: "projectDetails"
                }
            },
            { $unwind: "$projectDetails" },
            { $match: { "projectDetails.project_name": { $regex: search, $options: "i" }, approval_status: false } }
        ]);

        return {
            data: receiveData,
            totalPage: Math.ceil(totalData.length / 5)
        };
    }

    /**
     * Update a receive record.
     */
    async updateReceive(input: ReceiveInput): Promise<boolean> {
        const { _id, project_id, date, description, materialDetails, transferId } = input;

        await receiveDB.findByIdAndUpdate(_id, {
            project_id,
            date,
            description,
            materialDetails,
            transfer_id: transferId
        });

        return true;
    }

    /**
     * Delete receive record by ID.
     */
    async deleteReceiveById(_id: string): Promise<boolean> {
        await receiveDB.findByIdAndDelete(_id);
        return true;
    }

    /**
     * Get receive record by ID.
     */
    async getReceiveById(_id: string): Promise<IReceiveModelEntity | null> {
        const data = await receiveDB.findById(_id);
        return data || null;
    }

    /**
     * Approve a receive record.
     */
    async approveReceive(_id: string): Promise<void> {
        await receiveDB.findByIdAndUpdate(_id, { approval_status: true });
    }

    /**
     * Get all approved receive records.
     */
    async findAllReceive(): Promise<IReceiveModelEntity[]> {
        return await receiveDB.find({ approval_status: true });
    }
}
