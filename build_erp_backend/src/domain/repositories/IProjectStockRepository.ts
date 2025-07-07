import { ProjectStock } from "../types/material";

export interface IProjectStockRepository{
   saveProjectStock(project_id:string,material_id:string,stock:number):Promise<void>;
   findProjectStockByMaterialId(material_id:string):Promise<ProjectStock[] | []>;
   findProjectStockById(_id:string):Promise<ProjectStock | null>;
   updateProjectStockById(_id:string,project_id:string,material:string,stock:number):Promise<void>;
   deleteProjectStockByMaterialId(material_id:string):Promise<void>;
}