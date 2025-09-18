import { addProjectStockInput, stockDisplayAggregate } from '../../../application/Entities/material.entity';
import { incrementStockInput, projectStockInput, ProjectStockOutput } from '../../../application/Entities/project.entity';
import { listProjectStock } from '../../../application/Entities/transfer.entity';
import { IProjectStockModelEntity } from '../modelEntities/projectStock.entity';


export interface IProjectStockRepository {

   createProjectStock(input: addProjectStockInput):
      Promise<void>;

   getProjectStockByMaterialId(materialId: string):
      Promise<ProjectStockOutput[]>;

   getProjectStockById(id: string):
      Promise<IProjectStockModelEntity | null>;

   updateProjectStock(input: projectStockInput):
      Promise<void>;

   deleteProjectStockByMaterialId(materialId: string):
      Promise<void>;

   increaseStock(input: incrementStockInput):
      Promise<void>

   decreaseStock(input: incrementStockInput):
      Promise<void>

   getStockQuantityByProjectAndMaterial(input: incrementStockInput):
      Promise<number | undefined>

   getMaterialStockByProject(projectId: string, material: string, page: number, id: string):
      Promise<{ data: stockDisplayAggregate[], totalPage: number }>

   projectStockbyAggregate(projectId: string):
      Promise<listProjectStock[]>

}