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

   saveEstimation(spec_id: string, project_id: string, unit_rate: number, quantity: number):
      Promise<IEstimationModelEntity | null>

   saveMaterialEstimation(material_id: string, quantity: number, unit_rate: number, project_id: string):
      Promise<IEstimationMaterialModelEntity | null>

   saveLabourEstimation(labour_id: string, daily_wage: number, numberoflabour: number, project_id: string):
      Promise<IEstimationLabourModelEntity | null>

   saveAdditionalEstimation(additional_expense_amount: number, additional_expense_per: number, profit_amount: number, profit_per: number, project_id: string):
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

