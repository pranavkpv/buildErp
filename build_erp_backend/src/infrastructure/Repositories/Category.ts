import { categoryDB } from "../../api/models/CategoryModel";
import { saveCategoryInput } from "../../application/Entities/category.entity";
import { listingInput } from "../../application/Entities/common.entity";
import { ICategoryModelEntity } from "../../domain/Entities/modelEntities/category.entity";
import { ICategoryRepository } from "../../domain/Entities/IRepository/ICategory";

export class CategoryRepository implements ICategoryRepository {

   // Get all categories
   async getAllCategories(): Promise<ICategoryModelEntity[]> {
      return await categoryDB.find({});
   }

   // Get category by name (case-insensitive)
   async getCategoryByName(categoryName: string): Promise<ICategoryModelEntity | null> {
      return await categoryDB.findOne({
         category_name: { $regex: new RegExp(`^${ categoryName }$`, "i") }
      });
   }

   // Check if category exists by name excluding a specific ID (for edit validation)
   async getCategoryForEdit(_id: string, categoryName: string): Promise<ICategoryModelEntity | null> {
      return await categoryDB.findOne({
         _id: { $ne: _id },
         category_name: { $regex: new RegExp(`^${ categoryName }$`, "i") }
      });
   }

   // Get paginated list of categories with search
   async getCategoriesWithPagination(input: listingInput):
      Promise<{ data: ICategoryModelEntity[]; totalPages: number }> {
      const { page, search } = input;
      const limit = 5;
      const skip = page * limit;
      const searchRegex = new RegExp(search, "i");

      const categoryList = await categoryDB
         .find({ category_name: { $regex: searchRegex } })
         .skip(skip)
         .limit(limit);

      const totalDocs = await categoryDB.countDocuments({ category_name: { $regex: searchRegex } });

      return { data: categoryList, totalPages: Math.ceil(totalDocs / limit) };
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
   async deleteCategory(_id: string): Promise<ICategoryModelEntity | null> {
      return await categoryDB.findByIdAndDelete(_id);
   }

   // Get category by ID
   async getCategoryById(_id: string): Promise<ICategoryModelEntity | null> {
      return await categoryDB.findById(_id);
   }
}
