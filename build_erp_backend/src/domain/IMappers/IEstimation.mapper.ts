import { additionEstimateDTO, estimateByProjectDTO, labourEstimateDTO, listEstimationDTO, materialEstimateDTO, publicEstimationDTO, specListInProjectDTO } from '../../application/dto/estimation.dto';
import { estimationAggregatebyLabour, estimationAggregatebymaterialbrandunit, estimationAggregatebySpec, estiomationAggregatebyProject, estiomationAggregateByspec } from '../../application/entities/estimation.entity';
import { IEstimationAdditionalModalEntity } from '../Entities/modelEntities/estimationAdditional.entity';

export interface IEstimationmapper {
   topublicEstimateData(estimation:estiomationAggregateByspec[]):publicEstimationDTO[]
   tolistEstimationDTO(estimation: estiomationAggregatebyProject[]): listEstimationDTO[]
   toSpecListDTO(estimation:estiomationAggregateByspec[]):specListInProjectDTO[]
   toEstimateByProjectDTO(estimation:estimationAggregatebySpec[]):estimateByProjectDTO[]
   toMaterialEstimateDTO(estimation:estimationAggregatebymaterialbrandunit[]):materialEstimateDTO[]
   tolabourEstimateDTO(estimation:estimationAggregatebyLabour[]):labourEstimateDTO[]
   toadditionEstimateDTO(estimation:IEstimationAdditionalModalEntity[]):additionEstimateDTO[]
}