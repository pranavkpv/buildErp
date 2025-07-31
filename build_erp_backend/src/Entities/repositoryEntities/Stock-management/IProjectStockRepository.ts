import { ProjectStock } from "../../Input-OutputEntities/MaterialEntities/material";
import { IProjectStockModelEntity } from "../../ModelEntities/ProjectStock.Entity";


export interface IProjectStockRepository{
   saveProjectStock(project_id:string,material_id:string,stock:number):Promise<void>;
   findProjectStockByMaterialId(material_id:string):Promise<ProjectStock[] | []>;
   findProjectStockById(_id:string):Promise<IProjectStockModelEntity | null>;
   updateProjectStockById(_id:string,project_id:string,material:string,stock:number):Promise<void>;
   deleteProjectStockByMaterialId(material_id:string):Promise<void>;
   IncrementStockById(material_id:string,project_id:string,quantity:number):Promise<void>
}