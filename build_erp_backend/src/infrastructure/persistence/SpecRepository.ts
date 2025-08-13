import { ISpecRepositoryEntity } from "../../Entities/repositoryEntities/Estimation-management/ISpecRepository";
import { aggregateSpec, InputSpecification } from "../../DTO/EstimationEntities/specification";
import { specDB } from "../../Database/Model/SpecModel";
import { ISpecModelEntity } from "../../Entities/ModelEntities/Spec.Entity";
import { listingInput } from "../../DTO/CommonEntities/common";

export class SpecRepository implements ISpecRepositoryEntity {

    /** 📄 Fetch specifications list with pagination & search */
    async fetchSpecList(input: listingInput): Promise<{ result: any[]; totalPage: number }> {
        const { page, search } = input;
        const skip = page * 5;

        const totalDocuments = await specDB.countDocuments();
        const totalPage = Math.ceil(totalDocuments / 5);

        const sample = await specDB.aggregate([
            { $match: { spec_name: { $regex: search, $options: "i" } } },
            { $unwind: "$materialDetails" },
            { $addFields: { "materialDetails.materialObjectId": { $toObjectId: "$materialDetails.material_id" } } },
            {
                $lookup: {
                    from: "materials",
                    localField: "materialDetails.materialObjectId",
                    foreignField: "_id",
                    as: "materialData"
                }
            },
            { $unwind: { path: "$materialData", preserveNullAndEmptyArrays: true } },
            {
                $addFields: {
                    "materialData.brandObjectId": { $toObjectId: "$materialData.brand_id" },
                    "materialData.unitObjectId": { $toObjectId: "$materialData.unit_id" }
                }
            },
            {
                $lookup: {
                    from: "brands",
                    localField: "materialData.brandObjectId",
                    foreignField: "_id",
                    as: "materialData.brand_info"
                }
            },
            { $unwind: { path: "$materialData.brand_info", preserveNullAndEmptyArrays: true } },
            {
                $lookup: {
                    from: "units",
                    localField: "materialData.unitObjectId",
                    foreignField: "_id",
                    as: "materialData.unit_info"
                }
            },
            { $unwind: { path: "$materialData.unit_info", preserveNullAndEmptyArrays: true } },
            {
                $group: {
                    _id: "$_id",
                    spec_id: { $first: "$spec_id" },
                    spec_name: { $first: "$spec_name" },
                    spec_unit: { $first: "$spec_unit" },
                    description: { $first: "$description" },
                    profit_per: { $first: "$profit_per" },
                    additionalExpense_per: { $first: "$additionalExpense_per" },
                    createdAt: { $first: "$createdAt" },
                    updatedAt: { $first: "$updatedAt" },
                    labourDetails: { $first: "$labourDetails" },
                    materialDetails: {
                        $push: {
                            material_id: "$materialDetails.material_id",
                            quantity: "$materialDetails.quantity",
                            _id: "$materialDetails._id",
                            material_info: {
                                _id: "$materialData._id",
                                material_name: "$materialData.material_name",
                                rate: "$materialData.rate",
                                brand: "$materialData.brand_info",
                                unit: "$materialData.unit_info"
                            }
                        }
                    }
                }
            },
            { $unwind: { path: "$labourDetails", preserveNullAndEmptyArrays: true } },
            { $addFields: { "labourDetails.labourObjectId": { $toObjectId: "$labourDetails.labour_id" } } },
            {
                $lookup: {
                    from: "labour",
                    localField: "labourDetails.labourObjectId",
                    foreignField: "_id",
                    as: "labourData"
                }
            },
            { $unwind: { path: "$labourData", preserveNullAndEmptyArrays: true } },
            {
                $group: {
                    _id: "$_id",
                    spec_id: { $first: "$spec_id" },
                    spec_name: { $first: "$spec_name" },
                    spec_unit: { $first: "$spec_unit" },
                    description: { $first: "$description" },
                    additionalExpense_per: { $first: "$additionalExpense_per" },
                    profit_per: { $first: "$profit_per" },
                    createdAt: { $first: "$createdAt" },
                    updatedAt: { $first: "$updatedAt" },
                    materialDetails: { $first: "$materialDetails" },
                    labourDetails: {
                        $push: {
                            labour_id: "$labourDetails.labour_id",
                            numberoflabour: "$labourDetails.numberoflabour",
                            _id: "$labourDetails._id",
                            labour_info: {
                                _id: "$labourData._id",
                                labour_type: "$labourData.labour_type",
                                daily_wage: "$labourData.daily_wage"
                            }
                        }
                    }
                }
            },

            { $skip: skip },
            { $limit: 5 }
        ]);

        return { result: sample, totalPage };
    }

    /** 📄 Save a new specification */
    async saveSpecData(input: InputSpecification): Promise<void> {
        const { specId, specname, specUnit, specDescription, materialDetails, labourDetails, additionalExpense_per, profit_per } = input;
        const newSpec = new specDB({
            spec_id: specId,
            spec_name: specname,
            spec_unit: specUnit,
            description: specDescription,
            materialDetails,
            labourDetails,
            additionalExpense_per,
            profit_per
        });
        await newSpec.save();
    }

    /** 📄 Check if specification name exists */
    async existSpecname(specname: string): Promise<ISpecModelEntity | null> {
        return await specDB.findOne({ spec_name: { $regex: specname, $options: "i" } });
    }

    /** 📄 Check if specification ID exists */
    async existSpecId(specId: string): Promise<ISpecModelEntity | null> {
        return await specDB.findOne({ spec_id: { $regex: specId, $options: "i" } });
    }

    /** 📄 Fetch a specification for editing */
    async editSpecFetch(_id: string): Promise<aggregateSpec[] | null> {
        const specData = await specDB.aggregate([
            { $match: { _id: _id } },
            { $addFields: { unitObjectId: { $toObjectId: "spec_unit" } } },
            {
                $lookup: {
                    from: "unit",
                    localField: "unitObjectId",
                    foreignField: "_id",
                    as: "unitDetails"
                }
            }
        ]);
        return specData || null;
    }

    /** 📄 Delete specification by ID */
    async DeleteSpec(_id: string): Promise<void> {
        await specDB.findByIdAndDelete(_id);
    }

    /** 📄 Fetch all specifications (no pagination) */
    async fetchSpec(): Promise<ISpecModelEntity[]> {
        return await specDB.find();
    }

    /** 📄 Find specification by material ID */
    async findSpecByMaterialId(_id: string): Promise<ISpecModelEntity | null> {
        return await specDB.findOne({ materialDetails: { $elemMatch: { material_id: _id } } });
    }

    /** 📄 Find specification by labour ID */
    async findSpecByLabourId(_id: string): Promise<ISpecModelEntity | null> {
        return await specDB.findOne({ labourDetails: { $elemMatch: { labour_id: _id } } });
    }

    /** 📄 Update specification */
    async UpdateSpec(input: InputSpecification): Promise<void> {
        const { _id, specId, specname, specUnit, specDescription, materialDetails, labourDetails, additionalExpense_per, profit_per } = input;
        await specDB.findByIdAndUpdate(_id, {
            spec_id: specId,
            spec_name: specname,
            spec_unit: specUnit,
            description: specDescription,
            materialDetails,
            labourDetails,
            additionalExpense_per,
            profit_per
        });
    }

    /** 📄 Check for duplicate spec ID on edit */
    async findSpecInEdit(_id: string, spec_id: string): Promise<ISpecModelEntity | null> {
        return await specDB.findOne({ _id: { $ne: _id }, spec_id: { $regex: spec_id, $options: "i" } });
    }

    /** 📄 Check for duplicate spec name on edit */
    async findSpecInEditByName(_id: string, specname: string): Promise<ISpecModelEntity | null> {
        return await specDB.findOne({ _id: { $ne: _id }, spec_id: { $regex: specname, $options: "i" } });
    }
}
