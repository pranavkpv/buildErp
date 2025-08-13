import { categoryDB } from "../../Database/Model/CategoryModel";
import { categoryInput, listCategoryOutput } from "../../DTO/CategoryEntities/Category.Entity";
import { ICategoryModelEntity } from "../../Entities/ModelEntities/Category.Entity";
import { ICategoryRepositoryEntity } from "../../Entities/repositoryEntities/Material-management/ICategoryRepository";

/**
 * Repository implementation for Category operations
 */
export class CategoryRepository implements ICategoryRepositoryEntity {

   /* --------------------------------------------------------
    * FIND METHODS
    * -------------------------------------------------------- */

   /** Get all categories */
   async findAllCategory(): Promise<ICategoryModelEntity[]> {
      return await categoryDB.find({});
   }

   /** Find a category by its name (case-insensitive) */
   async findByCategoryName(input: categoryInput): Promise<ICategoryModelEntity | null> {
      const { category_name } = input;
      return await categoryDB.findOne({
         category_name: { $regex: new RegExp(`^${ category_name }$`, "i") }
      });
   }

   /** Find category for edit check (exclude same _id) */
   async findCategoryInEdit(
      input: categoryInput
   ): Promise<ICategoryModelEntity | null> {
      const { _id, category_name } = input
      return await categoryDB.findOne({
         _id: { $ne: _id },
         category_name: { $regex: new RegExp(`^${ category_name }$`, "i") }
      });
   }

   /** Get paginated and searched category list */
   async findAllListCategory(page: number, search: string): Promise<listCategoryOutput> {
      const limit = 5;
      const skip = page * limit;
      const searchRegex = new RegExp(search, "i");

      const categoryList = await categoryDB
         .find({ category_name: { $regex: searchRegex } })
         .skip(skip)
         .limit(limit);

      const totalPage = Math.ceil(
         await categoryDB.countDocuments({ category_name: { $regex: searchRegex } }) / limit
      );

      return { data: categoryList, totalPage };
   }

   /* --------------------------------------------------------
    * CREATE / UPDATE / DELETE METHODS
    * -------------------------------------------------------- */

   /** Save a new category */
   async saveCategory(input: categoryInput): Promise<ICategoryModelEntity> {
      const { category_name, description } = input;
      const newCategory = new categoryDB({ category_name, description });
      return await newCategory.save();
   }

   /** Update category by ID */
   async updateCategoryById(
      input: categoryInput
   ): Promise<ICategoryModelEntity | null> {
      const { _id, category_name, description } = input;
      return await categoryDB.findByIdAndUpdate(_id, { category_name, description });
   }

   /** Delete category by ID */
   async deleteCategoryById(_id: string): Promise<ICategoryModelEntity | null> {
      return await categoryDB.findByIdAndDelete(_id);
   }

   /** Find category by ID */
   async findCategoryById(_id: string):
      Promise<ICategoryModelEntity | null> {
      return await categoryDB.findById(_id)
   }
}
