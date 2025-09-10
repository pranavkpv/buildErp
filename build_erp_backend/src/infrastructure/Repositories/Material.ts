import mongoose from 'mongoose';
import { IMaterialRepository } from '../../domain/Entities/IRepository/IMaterial';
import { materialDB } from '../../api/models/MaterialModel';
import { projectDB } from '../../api/models/ProjectModel';
import { unitDB } from '../../api/models/UnitModel';
import { brandDB } from '../../api/models/BrandModel';
import { IProjectModelEntity } from '../../domain/Entities/modelEntities/project.entity';
import { IMaterialModelEntity } from '../../domain/Entities/modelEntities/material.entity';
import { addMaterialInput, editMaterialFullDatafetch, editMaterialInput, fetchUnitRateInput, findMaterialBynameCatBrandInput, findMaterialBynameCatBrandInputEdit, materialSumInput, materialswithAggregateBrand } from '../../application/Entities/material.entity';
import { listingInput } from '../../application/Entities/common.entity';


export class MaterialRepository implements IMaterialRepository {

    //  Calculate total material cost
    async calculateTotalMaterialCost(input: materialSumInput[]): Promise<number> {
        let sum = 0;
        for (const element of input) {
            const material = await materialDB.findById(element.material_id);
            if (material) {
                sum += material.unit_rate * element.quantity;
            }
        }
        return sum;
    }

    // Get paginated material list with category, brand, unit
    async getPaginatedMaterials(input: listingInput):
        Promise<{ data: editMaterialFullDatafetch[], totalPage: number }> {
        const { page, search } = input;
        const skip = page * 5;
        const searchRegex = new RegExp(search, 'i');

        const MaterialData = await materialDB.aggregate([
            {
                $addFields: {
                    categoryObjectId: { $toObjectId: '$category_id' },
                    unitObjectId: { $toObjectId: '$unit_id' },
                    brandObjectId: { $toObjectId: '$brand_id' },
                },
            },
            { $lookup: { from: 'categories', localField: 'categoryObjectId', foreignField: '_id', as: 'categoryDetails' } },
            { $lookup: { from: 'units', localField: 'unitObjectId', foreignField: '_id', as: 'unitDetails' } },
            { $lookup: { from: 'brands', localField: 'brandObjectId', foreignField: '_id', as: 'brandDetails' } },
            { $match: { material_name: { $regex: searchRegex }, blockStatus: false } },
            { $skip: skip },
            { $limit: 5 }, { $sort: { createdAt: -1 } },
        ]);
        const totalDoc = await materialDB.aggregate([
            {
                $addFields: {
                    categoryObjectId: { $toObjectId: '$category_id' },
                    unitObjectId: { $toObjectId: '$unit_id' },
                    brandObjectId: { $toObjectId: '$brand_id' },
                },
            },
            { $lookup: { from: 'categories', localField: 'categoryObjectId', foreignField: '_id', as: 'categoryDetails' } },
            { $lookup: { from: 'units', localField: 'unitObjectId', foreignField: '_id', as: 'unitDetails' } },
            { $lookup: { from: 'brands', localField: 'brandObjectId', foreignField: '_id', as: 'brandDetails' } },
            { $match: { material_name: { $regex: searchRegex }, blockStatus: false } },
        ]);
        const totalPage = Math.ceil(totalDoc.length / 5);
        return { data: MaterialData, totalPage };
    }

    // Get all projects
    async getAllProjects(): Promise<IProjectModelEntity[]> {
        return await projectDB.find();
    }

    // Find material by name + category + brand
    async getMaterialByNameCategoryBrand(input: findMaterialBynameCatBrandInput):
        Promise<IMaterialModelEntity | null> {
        const { material_name, category_id, brand_id } = input;
        return await materialDB.findOne({
            material_name: { $regex: new RegExp(`^${ material_name }$`, 'i') },
            category_id,
            brand_id,
        });
    }

    // Create new material
    async createMaterial(input: Omit<addMaterialInput, 'projectWiseStock'>): Promise<IMaterialModelEntity> {
        const { material_name, category_id, brand_id, unit_id, unit_rate, stock } = input;
        const newMaterial = new materialDB({ material_name, category_id, brand_id, unit_id, unit_rate, stock });
        return await newMaterial.save();
    }

    //  Get material with category, brand, and unit details
    async getMaterialById(id: string): Promise<editMaterialFullDatafetch | null> {
        const objectId = new mongoose.Types.ObjectId(id);
        const materialData = await materialDB.aggregate([
            { $match: { _id: objectId } },
            {
                $addFields: {
                    categoryObjectId: { $toObjectId: '$category_id' },
                    brandObjectId: { $toObjectId: '$brand_id' },
                    unitObjectId: { $toObjectId: '$unit_id' },
                },
            },
            { $lookup: { from: 'category', localField: 'categoryObjectId', foreignField: '_id', as: 'categoryDetails' } },
            { $lookup: { from: 'brand', localField: 'brandObjectId', foreignField: '_id', as: 'brandDetails' } },
            { $lookup: { from: 'unit', localField: 'unitObjectId', foreignField: '_id', as: 'unitDetails' } },
        ]);
        return materialData[0] || null;
    }

    // Check duplicate material on edit
    async checkDuplicateMaterialOnEdit(input: findMaterialBynameCatBrandInputEdit):
        Promise<IMaterialModelEntity | null> {
        const { _id, material_name, category_id, brand_id } = input;
        return await materialDB.findOne({
            _id: { $ne: _id },
            material_name: { $regex: new RegExp(`^${ material_name }$`, 'i') },
            category_id,
            brand_id,
        });
    }

    //  Update material
    async updateMaterial(input: Omit<editMaterialInput, 'projectWiseStock'>): Promise<void> {
        const { _id, material_name, category_id, brand_id, unit_id, unit_rate, stock } = input;
        await materialDB.findByIdAndUpdate(_id, { material_name, category_id, brand_id, unit_id, unit_rate, stock });
    }

    //  Delete material
    async deleteMaterial(id: string): Promise<void> {
        await materialDB.findByIdAndUpdate(id, { blockStatus: true });
    }

    // Get material by brand
    async getMaterialByBrandId(brandId: string): Promise<IMaterialModelEntity | null> {
        return await materialDB.findOne({ brandId });
    }

    // Get material by category
    async getMaterialByCategoryId(categoryId: string): Promise<IMaterialModelEntity | null> {
        return await materialDB.findOne({ categoryId });
    }

    //  Get material by unit
    async getMaterialByUnitId(unitId: string): Promise<IMaterialModelEntity | null> {
        return await materialDB.findOne({ unitId });
    }

    //  Get all unique material names
    async getAllUniqueMaterialNames(): Promise<string[]> {
        return await materialDB.distinct('material_name');
    }

    // Get unit names for a material
    async getUnitsByMaterialName(materialName: string): Promise<string[]> {
        const result = await materialDB.find({ material_name: materialName }).distinct('unit_id');
        return await unitDB.find({ _id: { $in: result } }).distinct('unit_name');
    }

    //  Get brand names for a material
    async getBrandsByMaterialName(materialName: string): Promise<string[]> {
        const result = await materialDB.find({ material_name: materialName }).distinct('brand_id');
        return await brandDB.find({ _id: { $in: result } }).distinct('brand_name');
    }

    //  Get unit rate by material + brand + unit
    async getUnitRate(input: fetchUnitRateInput): Promise<IMaterialModelEntity | null> {
        const { material_name, brand_name, unit_name } = input;
        const brandId = await brandDB.findOne({ brand_name });
        const unitId = await unitDB.findOne({ unit_name });
        return await materialDB.findOne({
            material_name,
            brand_id: brandId?._id,
            unit_id: unitId?._id,
        });
    }
    async getAllMaterialByIdswithAggregateBrand(materialnames: string[]):
        Promise<materialswithAggregateBrand[]> {
        const materialData = await materialDB.aggregate([
            {
                $match: {
                    material_name: { $in: materialnames }
                }
            },
            {
                $addFields: {
                    brandObjectId: { $toObjectId: "$brand_id" }
                }
            },
            {
                $lookup: {
                    from: "brands",
                    localField: "brandObjectId",
                    foreignField: "_id",
                    as: "brandDetails"
                }
            },
            {
                $unwind: "$brandDetails"
            }
        ])

        return materialData
    }
    async getMaterialByIds(materialIds: string[]):
        Promise<IMaterialModelEntity[]> {
        return await materialDB.find({ _id: { $in: materialIds } })
    }
    async getMaterialBynameAndBrand(material_name: string, brand_id: string):
        Promise<IMaterialModelEntity | null> {
        return await materialDB.findOne({ material_name, brand_id })
    }
}

