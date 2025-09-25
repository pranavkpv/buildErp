import { specDB } from '../../api/models/SpecModel';
import { aggregateUnitSpecDTO } from '../../application/dto/specification.dto';
import { listingInput } from '../../application/entities/common.entity';
import { InputSpecification, listSpec } from '../../application/entities/spec.entity';
import { ISpecModelEntity } from '../../domain/Entities/modelEntities/spec.entity';
import { ISpecRepository } from '../../domain/Entities/IRepository/ISpecification';

export class SpecRepository implements ISpecRepository {

    //  Get paginated and searched specification list
    async getAllSpecs(input: listingInput): Promise<{ result: listSpec[]; totalPage: number }> {
        const { page, search } = input;
        const skip = page * 5;


        const sample = await specDB.aggregate([
            { $match: { spec_name: { $regex: search, $options: 'i' }, blockStatus: false } },
            { $unwind: '$materialDetails' },
            { $addFields: { 'materialDetails.materialObjectId': { $toObjectId: '$materialDetails.material_id' } } },
            {
                $lookup: {
                    from: 'materials',
                    localField: 'materialDetails.materialObjectId',
                    foreignField: '_id',
                    as: 'materialData',
                },
            },
            { $unwind: { path: '$materialData', preserveNullAndEmptyArrays: true } },
            {
                $addFields: {
                    'materialData.brandObjectId': { $toObjectId: '$materialData.brand_id' },
                    'materialData.unitObjectId': { $toObjectId: '$materialData.unit_id' },
                },
            },
            {
                $lookup: {
                    from: 'brands',
                    localField: 'materialData.brandObjectId',
                    foreignField: '_id',
                    as: 'materialData.brand_info',
                },
            },
            { $unwind: { path: '$materialData.brand_info', preserveNullAndEmptyArrays: true } },
            {
                $lookup: {
                    from: 'units',
                    localField: 'materialData.unitObjectId',
                    foreignField: '_id',
                    as: 'materialData.unit_info',
                },
            },
            { $unwind: { path: '$materialData.unit_info', preserveNullAndEmptyArrays: true } },
            {
                $group: {
                    _id: '$_id',
                    spec_id: { $first: '$spec_id' },
                    spec_name: { $first: '$spec_name' },
                    spec_unit: { $first: '$spec_unit' },
                    description: { $first: '$description' },
                    profit_per: { $first: '$profit_per' },
                    additionalExpense_per: { $first: '$additionalExpense_per' },
                    createdAt: { $first: '$createdAt' },
                    updatedAt: { $first: '$updatedAt' },
                    labourDetails: { $first: '$labourDetails' },
                    materialDetails: {
                        $push: {
                            material_id: '$materialDetails.material_id',
                            quantity: '$materialDetails.quantity',
                            _id: '$materialDetails._id',
                            material_info: {
                                _id: '$materialData._id',
                                material_name: '$materialData.material_name',
                                rate: '$materialData.rate',
                                brand: '$materialData.brand_info',
                                unit: '$materialData.unit_info',
                            },
                        },
                    },
                },
            },
            { $unwind: { path: '$labourDetails', preserveNullAndEmptyArrays: true } },
            { $addFields: { 'labourDetails.labourObjectId': { $toObjectId: '$labourDetails.labour_id' } } },
            {
                $lookup: {
                    from: 'labour',
                    localField: 'labourDetails.labourObjectId',
                    foreignField: '_id',
                    as: 'labourData',
                },
            },
            { $unwind: { path: '$labourData', preserveNullAndEmptyArrays: true } },
            {
                $group: {
                    _id: '$_id',
                    spec_id: { $first: '$spec_id' },
                    spec_name: { $first: '$spec_name' },
                    spec_unit: { $first: '$spec_unit' },
                    description: { $first: '$description' },
                    additionalExpense_per: { $first: '$additionalExpense_per' },
                    profit_per: { $first: '$profit_per' },
                    createdAt: { $first: '$createdAt' },
                    updatedAt: { $first: '$updatedAt' },
                    materialDetails: { $first: '$materialDetails' },
                    labourDetails: {
                        $push: {
                            labour_id: '$labourDetails.labour_id',
                            numberoflabour: '$labourDetails.numberoflabour',
                            _id: '$labourDetails._id',
                            labour_info: {
                                _id: '$labourData._id',
                                labour_type: '$labourData.labour_type',
                                daily_wage: '$labourData.daily_wage',
                            },
                        },
                    },
                },
            },
            { $skip: skip },
            { $limit: 5 },
        ]);



        const totalPage = Math.ceil(sample.length / 5);
        return { result: sample, totalPage };
    }

    // Create new spec
    async createSpec(input: InputSpecification): Promise<void> {
        const { specId, specname, specUnit, specDescription, materialDetails, labourDetails, additionalExpensePer, profitPer } = input;
        const newSpec = new specDB({
            spec_id: specId,
            spec_name: specname,
            spec_unit: specUnit,
            description: specDescription,
            materialDetails,
            labourDetails,
            additionalExpense_per: additionalExpensePer,
            profit_per: profitPer,
        });
        await newSpec.save();
    }

    // Find spec by name
    async getSpecByName(specname: string): Promise<ISpecModelEntity | null> {
        return await specDB.findOne({ spec_name: { $regex: specname, $options: 'i' } });
    }

    // Find spec by ID
    async getSpecBySpecId(specId: string): Promise<ISpecModelEntity | null> {
        return await specDB.findOne({ spec_id: { $regex: specId, $options: 'i' } });
    }

    // Fetch spec details for edit
    async getSpecForEdit(id: string): Promise<aggregateUnitSpecDTO[] | null> {
        const specData = await specDB.aggregate([
            { $match: { _id: id } },
            { $addFields: { unitObjectId: { $toObjectId: 'spec_unit' } } },
            {
                $lookup: {
                    from: 'unit',
                    localField: 'unitObjectId',
                    foreignField: '_id',
                    as: 'unitDetails',
                },
            },
        ]);
        return specData || null;
    }

    // Delete spec
    async deleteSpecById(id: string): Promise<void> {
        await specDB.findByIdAndUpdate(id, { blockStatus: true });
    }

    // Fetch all specs (no pagination)
    async getAllSpecsList(): Promise<ISpecModelEntity[]> {
        return await specDB.find({ blockStatus:false });
    }

    // Find spec by material ID
    async getSpecByMaterialId(id: string): Promise<ISpecModelEntity | null> {
        return await specDB.findOne({ materialDetails: { $elemMatch: { material_id: id } } });
    }

    // Find spec by labour ID
    async getSpecByLabourId(id: string): Promise<ISpecModelEntity | null> {
        return await specDB.findOne({ labourDetails: { $elemMatch: { labour_id: id } } });
    }

    // Update spec
    async updateSpec(input: InputSpecification): Promise<void> {
        const { _id, specId, specname, specUnit, specDescription, materialDetails, labourDetails, additionalExpensePer, profitPer } = input;
        await specDB.findByIdAndUpdate(_id, {
            spec_id: specId,
            spec_name: specname,
            spec_unit: specUnit,
            description: specDescription,
            materialDetails,
            labourDetails,
            additionalExpense_per: additionalExpensePer,
            profit_per: profitPer,
        });
    }

    // Check duplicate spec ID on edit
    async getSpecDuplicateById(id: string, specId: string): Promise<ISpecModelEntity | null> {
        return await specDB.findOne({ _id: { $ne: id }, spec_id: { $regex: specId, $options: 'i' } });
    }

    // Check duplicate spec name on edit
    async getSpecDuplicateByName(id: string, specname: string): Promise<ISpecModelEntity | null> {
        return await specDB.findOne({ _id: { $ne: id }, spec_id: { $regex: specname, $options: 'i' } });
    }
    async getAllSpecByIds(specIds: string[]): Promise<ISpecModelEntity[]> {
        return await specDB.find({ _id:{ $in:specIds } });
    }
    async getSpecById(id: string): Promise<ISpecModelEntity | null> {
        return await specDB.findById(id);
    }
}
