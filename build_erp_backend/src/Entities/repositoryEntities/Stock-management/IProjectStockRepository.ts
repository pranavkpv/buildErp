import { ProjectStock } from "../../../DTO/MaterialEntities/material";
import { addProjectStockInput, editprojectstockInput, incrementStockInput } from "../../../DTO/StockEntities/projectstock";
import { IProjectStockModelEntity } from "../../ModelEntities/ProjectStock.Entity";


export interface IProjectStockRepositoryEntity{
   saveProjectStock(input:addProjectStockInput):Promise<void>;
   findProjectStockByMaterialId(material_id:string):Promise<ProjectStock[] | []>;
   findProjectStockById(_id:string):Promise<IProjectStockModelEntity | null>;
   updateProjectStockById(input:editprojectstockInput):Promise<void>;
   deleteProjectStockByMaterialId(material_id:string):Promise<void>;
   IncrementStockById(input:incrementStockInput):Promise<void>
   DecrementStockByID(input:incrementStockInput):Promise<void>
   findProjectStockByProjectAndMaterialId(input:incrementStockInput):Promise<number | undefined>
}