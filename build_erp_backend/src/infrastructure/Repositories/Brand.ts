import { brandDB } from '../../api/models/BrandModel';
import { listingInput } from '../../application/entities/common.entity';
import { IBrandModelEntity } from '../../domain/Entities/modelEntities/brand.entity';
import { IBrandRepository } from '../../domain/Entities/IRepository/IBrand';

export class BrandRepository implements IBrandRepository {

    // Get all brands
    async getAllBrands(): Promise<IBrandModelEntity[] | []> {
        return await brandDB.find();
    }

    // Get a brand by its name (case-insensitive)
    async getBrandByName(brandName: string): Promise<IBrandModelEntity | null> {
        return await brandDB.findOne({
            brand_name: { $regex: new RegExp(`^${ brandName }$`, 'i') },
        });
    }

    // Create a new brand
    async createBrand(brandName: string): Promise<void> {
        const newBrand = new brandDB({ brand_name: brandName });
        await newBrand.save();
    }

    // Check if a brand exists by name, excluding a specific ID (used for edit validation)
    async getBrandForEdit(id: string, brandName: string):
        Promise<IBrandModelEntity | null> {
        return await brandDB.findOne({
            _id: { $ne: id },
            brand_name: { $regex: new RegExp(`^${ brandName }$`, 'i') },
        });
    }

    // Update brand name by ID
    async updateBrand(id: string, brandName: string): Promise<void> {
        await brandDB.findByIdAndUpdate(id, { brand_name: brandName });
    }

    // Delete brand by ID
    async deleteBrand(id: string): Promise<void> {
        await brandDB.findByIdAndUpdate(id, { blockStatus: true });
    }

    // Get brands with pagination and search
    async getBrandsWithPagination(input: listingInput):
        Promise<{ data: IBrandModelEntity[]; totalPage: number }> {
        const { search, page } = input;
        const skip = page * 5;
        const searchRegex = new RegExp(search, 'i');

        const brandList = await brandDB
            .find({ brand_name: { $regex: searchRegex }, blockStatus: false })
            .skip(skip)
            .limit(5).sort({ createdAt:-1 });

        const totalDoc = await brandDB.find({ brand_name: { $regex: searchRegex }, blockStatus: false });
        const totalPage = Math.ceil(totalDoc.length / 5);

        return {
            data: brandList,
            totalPage,
        };
    }
}
