import { listEstimationDTO, publicEstimationDTO, specListInProjectDTO } from "../../application/dto/estimation.dto";
import { estiomationAggregatebyProject, estiomationAggregateByspec } from "../../application/Entities/estimation.entity";

export interface IEstimationmapper {
   topublicEstimateData(estimation:estiomationAggregateByspec[]):publicEstimationDTO[]
   tolistEstimationDTO(estimation: estiomationAggregatebyProject[]): listEstimationDTO[]
   toSpecListDTO(estimation:estiomationAggregateByspec[]):specListInProjectDTO[]
}