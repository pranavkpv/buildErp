import { commonOutput } from "../../../Entities/Input-OutputEntities/CommonEntities/common";
import { EstimationData, estimationOutput } from "../../../Entities/Input-OutputEntities/EstimationEntities/estimation";
import { IEstimationRepository } from "../../../Entities/repositoryEntities/Estimation-management/IEstimationRepository";
import { IFetchExistEstimationUseCase } from "../../../Entities/useCaseEntities/AdminUseCaseEntities/EstimationUseCaseEntities/FetchExistEstimationEntity";
import { SUCCESS_MESSAGE } from "../../../Shared/Message";
import { HTTP_STATUS } from "../../../Shared/Status_code";
import { ResponseHelper } from "../../../Shared/utils/response";

export class FetchExistEstimationUseCase implements IFetchExistEstimationUseCase {
  private estimationRepository: IEstimationRepository
  constructor(estimationRepository: IEstimationRepository) {
    this.estimationRepository = estimationRepository
  }
  async execute(_id: string): Promise<estimationOutput | commonOutput> {
    try {
      const data = await this.estimationRepository.AggregateEstimationBySpec(_id)
      return {
        success: true,
        message: SUCCESS_MESSAGE.ESTIMATION.FETCH,
        status_code: HTTP_STATUS.OK,
        data
      }
    } catch (error: any) {
      return ResponseHelper.failure(error.message, HTTP_STATUS.INTERNAL_SERVER_ERROR)
    }
  }
}