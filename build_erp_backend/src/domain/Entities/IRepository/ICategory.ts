import { saveCategoryInput } from '../../../application/entities/category.entity';
import { listingInput } from '../../../application/entities/common.entity';
import { ICategoryModelEntity } from '../modelEntities/category.entity';

export interface ICategoryRepository {

   getAllCategories():
      Promise<ICategoryModelEntity[] | []>

   getCategoryByName(category_name: string):
      Promise<ICategoryModelEntity | null>

   getCategoryForEdit(id: string, categoryName: string):
      Promise<ICategoryModelEntity | null>

   getCategoriesWithPagination(input: listingInput):
      Promise<{ data: ICategoryModelEntity[]; totalPages: number }>

   createCategory(input: saveCategoryInput):
      Promise<ICategoryModelEntity>

   updateCategory(input: saveCategoryInput):
      Promise<ICategoryModelEntity | null>

   deleteCategory(id: string):
      Promise<ICategoryModelEntity | null>

   getCategoryById(id:string):
      Promise<ICategoryModelEntity | null>
      
}