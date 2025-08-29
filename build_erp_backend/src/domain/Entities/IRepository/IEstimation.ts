import { estiomationAggregatebyProject, estiomationAggregateByspec, saveEstimationInput } from '../../../application/Entities/estimation.entity';
import { IEstimationModelEntity } from '../modelEntities/estimation.entity';
import { IEstimationLabourModelEntity } from '../modelEntities/estimationLabour.entity';
import { IEstimationMaterialModelEntity } from '../modelEntities/estimationMaterial.entity';

export interface IEstimationRepository {

   getEstimationsGroupedBySpec(_id: string):
      Promise<estiomationAggregateByspec[]>

   createEstimation(specDetails: saveEstimationInput[], projectId: string):
      Promise<void>

   getEstimationsGroupedByProject(search: string, page: number):
      Promise<{ data: estiomationAggregatebyProject[], totalPage: number }>

   deleteEstimationsByProjectId(_id: string):
      Promise<void>

   getEstimationsByProjectId(projectId: string):
      Promise<IEstimationModelEntity[] | []>

   getEstimationBySpecId(_id: string):
      Promise<IEstimationModelEntity | null>

   getAllEstimationMaterials():
      Promise<IEstimationMaterialModelEntity[]>

   getAllEstimationLabours():
      Promise<IEstimationLabourModelEntity[]>

}

