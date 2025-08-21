import { saveCategoryInput } from "../../../application/entities/category.entity";
import { listingInput } from "../../../application/entities/common.entity";
import { ICategoryModelEntity } from "../../Entities/modelEntities/category.entity";

export interface ICategoryRepository{
   findAllCategory():Promise<ICategoryModelEntity[] | []> 
   findByCategoryName(category_name:string):Promise<ICategoryModelEntity | null> 
   saveCategory(input:saveCategoryInput):Promise<ICategoryModelEntity>
   findCategoryInEdit(_id:string,category_name:string):Promise<ICategoryModelEntity | null>
   updateCategoryById(input:saveCategoryInput):Promise<ICategoryModelEntity | null>
   deleteCategoryById(_id:string):Promise<ICategoryModelEntity | null>
   findAllListCategory(input:listingInput):Promise<{data:ICategoryModelEntity[],totalPage:number}>
   findCategoryById(_id:string):Promise<ICategoryModelEntity | null>
}