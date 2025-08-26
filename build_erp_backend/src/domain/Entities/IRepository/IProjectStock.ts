import { addProjectStockInput } from "../../../application/Entities/material.entity";
import { incrementStockInput, projectStockInput, ProjectStockOutput } from "../../../application/Entities/project.entity";
import { IProjectStockModelEntity } from "../modelEntities/projectStock.entity";


export interface IProjectStockRepository {

   createProjectStock(input: addProjectStockInput):
      Promise<void>;

   getProjectStockByMaterialId(material_id: string):
      Promise<ProjectStockOutput[]>;

   getProjectStockById(_id: string):
      Promise<IProjectStockModelEntity | null>;

   updateProjectStock(input: projectStockInput):
      Promise<void>;

   deleteProjectStockByMaterialId(material_id: string):
      Promise<void>;

   increaseStock(input: incrementStockInput):
      Promise<void>

   decreaseStock(input: incrementStockInput):
      Promise<void>

   getStockQuantityByProjectAndMaterial(input: incrementStockInput):
      Promise<number | undefined>
}