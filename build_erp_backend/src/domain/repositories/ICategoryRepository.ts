import { Category } from "../types/category";

export interface ICategoryRepository{
   findAllCategory():Promise<Category[] | []> 
   findByCategoryName(category_name:string):Promise<Category | null> 
   saveCategory(category_name:string,description:string):Promise<void>
   findCategoryInEdit(_id:string,category_name:string):Promise<Category | null>
   updateCategoryById(_id:string,category_name:string,description:string):Promise<void>
   deleteCategoryById(_id:string):Promise<void>
   findAllListCategory(page:number,search:string):Promise<{getCategoryData:any[];totalPage:number }>
}