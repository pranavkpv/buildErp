import { IEstimationRepository } from "../../../domain/Entities/IRepository/IEstimation";
import { IEstimationmapper } from "../../../domain/IMappers/IEstimation.mapper";
import { EstimationSuccessMessage } from "../../../Shared/Messages/Estimation.Message";
import { ResponseHelper } from "../../../Shared/responseHelpers/response";
import { commonOutput } from "../../dto/common";
import { materialEstimateDTO } from "../../dto/estimation.dto";
import { IGetMaterialEstimationUseCase } from "../../IUseCases/IEstimation/IGetMaterialEstimation";

export class GetMaterialEstimationUseCase implements IGetMaterialEstimationUseCase {
   constructor(
      private _estimationRepository: IEstimationRepository,
      private _estimationMapper: IEstimationmapper
   ) { }
   async execute(projectId: string): Promise<commonOutput<materialEstimateDTO[]>> {
       const data = await this._estimationRepository.getAggregateByMaterialBrandUnit(projectId)
       const mappedData = this._estimationMapper.toMaterialEstimateDTO(data)
       return ResponseHelper.success(EstimationSuccessMessage.FETCH,mappedData)
   }
}