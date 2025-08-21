import { addProjectStockInput } from "../../../application/entities/material.entity";
import { incrementStockInput, projectStockInput, ProjectStockOutput } from "../../../application/entities/project.entity";
import { IProjectStockModelEntity } from "../../Entities/modelEntities/projectStock.entity";


export interface IProjectStockRepository{
   saveProjectStock(input:addProjectStockInput):Promise<void>;
   findProjectStockByMaterialId(material_id:string):Promise<ProjectStockOutput[]>;
   findProjectStockById(_id:string):Promise<IProjectStockModelEntity | null>;
   updateProjectStockById(input:projectStockInput):Promise<void>;
   deleteProjectStockByMaterialId(material_id:string):Promise<void>;
   IncrementStockById(input:incrementStockInput):Promise<void>
   DecrementStockByID(input:incrementStockInput):Promise<void>
   findProjectStockByProjectAndMaterialId(input:incrementStockInput):Promise<number | undefined>
}