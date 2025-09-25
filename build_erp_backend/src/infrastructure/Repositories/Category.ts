import { categoryDB } from '../../api/models/CategoryModel';
import { saveCategoryInput } from '../../application/entities/category.entity';
import { listingInput } from '../../application/entities/common.entity';
import { ICategoryModelEntity } from '../../domain/Entities/modelEntities/category.entity';
import { ICategoryRepository } from '../../domain/Entities/IRepository/ICategory';

export class CategoryRepository implements ICategoryRepository {

    // Get all categories
    async getAllCategories(): Promise<ICategoryModelEntity[]> {
        return await categoryDB.find({});
    }

    // Get category by name (case-insensitive)
    async getCategoryByName(categoryName: string): Promise<ICategoryModelEntity | null> {
        return await categoryDB.findOne({
            category_name: { $regex: new RegExp(`^${ categoryName }$`, 'i') },
        });
    }

    // Check if category exists by name excluding a specific ID (for edit validation)
    async getCategoryForEdit(id: string, categoryName: string): Promise<ICategoryModelEntity | null> {
        return await categoryDB.findOne({
            _id: { $ne: id },
            category_name: { $regex: new RegExp(`^${ categoryName }$`, 'i') },
        });
    }

    // Get paginated list of categories with search
    async getCategoriesWithPagination(input: listingInput):
        Promise<{ data: ICategoryModelEntity[]; totalPages: number }> {
        const { page, search } = input;
        const limit = 5;
        const skip = page * limit;
        const searchRegex = new RegExp(search, 'i');

        const categoryList = await categoryDB
            .find({ category_name: { $regex: searchRegex }, blockStatus: false })
            .skip(skip)
            .limit(limit).sort({ createdAt:-1 });

        const totalDoc = await categoryDB.find({ category_name: { $regex: searchRegex }, blockStatus: false });
        const totalPages = Math.ceil(totalDoc.length / 5);

        return { data: categoryList, totalPages };
    }

    // Create a new category
    async createCategory(input: saveCategoryInput): Promise<ICategoryModelEntity> {
        const { category_name, description } = input;
        const newCategory = new categoryDB({ category_name, description });
        return await newCategory.save();
    }

    // Update category by ID
    async updateCategory(input: saveCategoryInput): Promise<ICategoryModelEntity | null> {
        const { _id, category_name, description } = input;
        return await categoryDB.findByIdAndUpdate(_id, { category_name, description });
    }

    // Delete category by ID
    async deleteCategory(id: string): Promise<ICategoryModelEntity | null> {
        return await categoryDB.findByIdAndUpdate(id, { blockStatus: true });
    }

    // Get category by ID
    async getCategoryById(id: string): Promise<ICategoryModelEntity | null> {
        return await categoryDB.findById(id);
    }
}
