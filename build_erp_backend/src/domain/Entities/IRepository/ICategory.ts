import { StringExpressionOperatorReturningNumber } from "mongoose";
import { saveCategoryInput } from "../../../application/Entities/category.entity";
import { listingInput } from "../../../application/Entities/common.entity";
import { ICategoryModelEntity } from "../modelEntities/category.entity";

export interface ICategoryRepository {

   getAllCategories():
      Promise<ICategoryModelEntity[] | []>

   getCategoryByName(category_name: string):
      Promise<ICategoryModelEntity | null>

   getCategoryForEdit(_id: string, categoryName: string):
      Promise<ICategoryModelEntity | null>

   getCategoriesWithPagination(input: listingInput):
      Promise<{ data: ICategoryModelEntity[]; totalPages: number }>

   createCategory(input: saveCategoryInput):
      Promise<ICategoryModelEntity>

   updateCategory(input: saveCategoryInput):
      Promise<ICategoryModelEntity | null>

   deleteCategory(_id: string):
      Promise<ICategoryModelEntity | null>

   getCategoryById(_id:string):
      Promise<ICategoryModelEntity | null>
      
}