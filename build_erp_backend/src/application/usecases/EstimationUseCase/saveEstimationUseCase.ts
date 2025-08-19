import { ISaveEstimationUseCase } from "../../interfaces/AdminUseCaseEntities/EstimationUseCaseEntities/SaveEstimationEntity";
import { ResponseHelper } from "../../../Shared/responseHelpers/response";
import { IEstimationRepository } from "../../../domain/interfaces/Estimation-management/IEstimationRepository";
import { EstimationSuccessMessage } from "../../../Shared/Messages/Estimation.Message";
import { saveEstimationInput } from "../../entities/estimation.entity";
import { commonOutput } from "../../dto/common";


export class SaveEstimationUseCase implements ISaveEstimationUseCase {
   constructor(private _estimationRepository: IEstimationRepository) { }
   async execute(input: { projectId: string, row: saveEstimationInput[] }): Promise<commonOutput> {
      const projectId = input.projectId
      const specDetails = input.row
      await this._estimationRepository.saveEstimation(specDetails, projectId)
      return ResponseHelper.createdSuccess(EstimationSuccessMessage.ADD)
   }
}