import { commonOutput } from "../../../Entities/Input-OutputEntities/CommonEntities/common";
import { EstimationData } from "../../../Entities/Input-OutputEntities/EstimationEntities/estimation";
import { IEstimationRepository } from "../../../Entities/repositoryEntities/Estimation-management/IEstimationRepository";
import { IFetchExistEstimationUseCase } from "../../../Entities/useCaseEntities/AdminUseCaseEntities/EstimationUseCaseEntities/FetchExistEstimationEntity";
import { HTTP_STATUS } from "../../../Shared/Status_code";
import { ResponseHelper } from "../../../Shared/utils/response";

export class FetchExistEstimationUseCase implements IFetchExistEstimationUseCase {
  private estimationRepository: IEstimationRepository
  constructor(estimationRepository: IEstimationRepository) {
    this.estimationRepository = estimationRepository
  }
  async execute(_id: string): Promise<EstimationData[] | commonOutput> {
    try {
      const data = await this.estimationRepository.AggregateEstimationBySpec(_id)
      return data
    } catch (error: any) {
      return ResponseHelper.failure(error.message, HTTP_STATUS.INTERNAL_SERVER_ERROR)
    }
  }
}