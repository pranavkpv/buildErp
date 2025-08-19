import { listEstimationDTO, publicEstimationDTO } from "../../application/dto/estimation.dto";
import { estiomationAggregatebyProject, estiomationAggregateByspec } from "../../application/entities/estimation.entity";

export interface IEstimationmapper {
   topublicEstimateData(estimation:estiomationAggregateByspec[]):publicEstimationDTO[]
   tolistEstimationDTO(estimation: estiomationAggregatebyProject[]): listEstimationDTO[]
}