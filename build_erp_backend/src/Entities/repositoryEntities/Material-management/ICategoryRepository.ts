import { Category } from "../../Input-OutputEntities/MaterialEntities/category";
import { ICategoryModelEntity } from "../../ModelEntities/Category.Entity";

export interface ICategoryRepository{
   findAllCategory():Promise<ICategoryModelEntity[] | []> 
   findByCategoryName(category_name:string):Promise<ICategoryModelEntity | null> 
   saveCategory(category_name:string,description:string):Promise<void>
   findCategoryInEdit(_id:string,category_name:string):Promise<ICategoryModelEntity | null>
   updateCategoryById(_id:string,category_name:string,description:string):Promise<void>
   deleteCategoryById(_id:string):Promise<void>
   findAllListCategory(page:number,search:string):Promise<{getCategoryData:any[];totalPage:number }>
}