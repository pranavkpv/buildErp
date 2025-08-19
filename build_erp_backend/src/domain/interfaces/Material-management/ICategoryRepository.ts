import { categoryInput, listCategoryOutput } from "../../../application/dto/CategoryEntities/Category.Entity";
import { ICategoryModelEntity } from "../../Entities/modelEntities/category.entity";

export interface ICategoryRepositoryEntity{
   findAllCategory():Promise<ICategoryModelEntity[] | []> 
   findByCategoryName(input:categoryInput):Promise<ICategoryModelEntity | null> 
   saveCategory(input:categoryInput):Promise<ICategoryModelEntity>
   findCategoryInEdit(input:categoryInput):Promise<ICategoryModelEntity | null>
   updateCategoryById(input:categoryInput):Promise<ICategoryModelEntity | null>
   deleteCategoryById(_id:string):Promise<ICategoryModelEntity | null>
   findAllListCategory(page:number,search:string):Promise<listCategoryOutput>
   findCategoryById(_id:string):Promise<ICategoryModelEntity | null>
}