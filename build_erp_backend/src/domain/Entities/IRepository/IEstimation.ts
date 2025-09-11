import { estimationAggregatebyLabour, estimationAggregatebymaterialbrandunit, estimationAggregatebySpec, estiomationAggregatebyProject, estiomationAggregateByspec, saveEstimationInput } from '../../../application/Entities/estimation.entity';
import { IEstimationModelEntity } from '../modelEntities/estimation.entity';
import { IEstimationAdditionalModalEntity } from '../modelEntities/estimationAdditional.entity';
import { IEstimationLabourModelEntity } from '../modelEntities/estimationLabour.entity';
import { IEstimationMaterialModelEntity } from '../modelEntities/estimationMaterial.entity';

export interface IEstimationRepository {

   getEstimationsGroupedBySpec(_id: string):
      Promise<estiomationAggregateByspec[]>

   createEstimation(specDetails: saveEstimationInput[], projectId: string):
      Promise<void>

   getEstimationsGroupedByProject(search: string, page: number):
      Promise<{ data: estiomationAggregatebyProject[], totalPage: number }>

   sendEstimationsByProjectId(_id: string):
      Promise<void>

   getEstimationsByProjectId(projectId: string):
      Promise<IEstimationModelEntity[] | []>

   getEstimationBySpecId(_id: string):
      Promise<IEstimationModelEntity | null>

   getAllEstimationMaterials():
      Promise<IEstimationMaterialModelEntity[]>

   getAllEstimationLabours():
      Promise<IEstimationLabourModelEntity[]>

   saveEstimation(specId: string, projectId: string, unitRate: number, quantity: number):
      Promise<IEstimationModelEntity | null>

   saveMaterialEstimation(materialId: string, quantity: number, unitRate: number, projectId: string):
      Promise<IEstimationMaterialModelEntity | null>

   saveLabourEstimation(labourId: string, dailyWage: number, numberoflabour: number, projectId: string):
      Promise<IEstimationLabourModelEntity | null>

   saveAdditionalEstimation(additionalExpenseAmount: number, additionalExpensePer: number, profitAmount: number, profitPer: number, projectId: string):
      Promise<IEstimationAdditionalModalEntity | null>

   deleteEstimationsByProjectId(id: string):
      Promise<void>

   getAggregateEstimationByProject(projectId: string):
      Promise<estimationAggregatebySpec[]>

   getAggregateByMaterialBrandUnit(projectId: string):
      Promise<estimationAggregatebymaterialbrandunit[]>

   getAggregateByLabour(projectId: string):
      Promise<estimationAggregatebyLabour[]>

   getAdditionalExpenseByProject(projectId: string):
      Promise<IEstimationAdditionalModalEntity[]>

   updateRejectStatusAndReason(projectId: string, reason: string):
      Promise<void>

   updateEstimationStatus(status: boolean, projectId: string):
      Promise<void>
}

