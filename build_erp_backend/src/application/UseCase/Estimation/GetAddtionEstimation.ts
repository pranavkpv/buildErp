import { IEstimationRepository } from "../../../domain/Entities/IRepository/IEstimation";
import { IEstimationmapper } from "../../../domain/IMappers/IEstimation.mapper";
import { EstimationSuccessMessage } from "../../../Shared/Messages/Estimation.Message";
import { ResponseHelper } from "../../../Shared/responseHelpers/response";
import { commonOutput } from "../../dto/common";
import { additionEstimateDTO } from "../../dto/estimation.dto";
import { IGetAdditionEstimationUseCase } from "../../IUseCases/IEstimation/IGetAdditionEstimation";

export class GetAdditionEstimationUseCase implements IGetAdditionEstimationUseCase {
   constructor(
      private _estimationRepository: IEstimationRepository,
      private _estimationMapper: IEstimationmapper
   ) { }
   async execute(projectId: string): Promise<commonOutput<additionEstimateDTO[]>> {
      const data = await this._estimationRepository.getAdditionalExpenseByProject(projectId)
      const mappedData = this._estimationMapper.toadditionEstimateDTO(data)
      return ResponseHelper.success(EstimationSuccessMessage.FETCH, mappedData)
   }
}