import { IEstimationRepository } from "../../../domain/Entities/IRepository/IEstimation";
import { IEstimationmapper } from "../../../domain/IMappers/IEstimation.mapper";
import { EstimationSuccessMessage } from "../../../Shared/Messages/Estimation.Message";
import { ResponseHelper } from "../../../Shared/responseHelpers/response";
import { commonOutput } from "../../dto/common";
import { estimateByProjectDTO } from "../../dto/estimation.dto";
import { IGetEstimationByProjectUsecase } from "../../IUseCases/IEstimation/IGetEstimationByProject";

export class GetEstimationByProjectUseCase implements IGetEstimationByProjectUsecase {
   constructor(
      private _estimationRepository: IEstimationRepository,
      private _estimationMapper: IEstimationmapper
   ) { }
   async execute(projectId: string):
      Promise<commonOutput<estimateByProjectDTO[]>> {
      const estimateData = await this._estimationRepository.getAggregateEstimationByProject(projectId)
      const mappedData = this._estimationMapper.toEstimateByProjectDTO(estimateData)
      return ResponseHelper.success(EstimationSuccessMessage.FETCH,mappedData)
   }
}