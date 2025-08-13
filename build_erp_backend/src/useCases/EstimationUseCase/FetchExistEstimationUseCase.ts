import { commonOutput } from "../../DTO/CommonEntities/common";
import { estimationOutput } from "../../DTO/EstimationEntities/estimation";
import { IFetchExistEstimationUseCaseEntity } from "../../Entities/useCaseEntities/AdminUseCaseEntities/EstimationUseCaseEntities/FetchExistEstimationEntity";
import { ResponseHelper } from "../../Shared/ResponseHelper/response";
import { IEstimationRepositoryEntity } from "../../Entities/repositoryEntities/Estimation-management/IEstimationRepository";
import { EstimationSuccessMessage } from "../../Shared/Messages/Estimation.Message";

export class FetchExistEstimationUseCase implements IFetchExistEstimationUseCaseEntity {
  private estimationRepository: IEstimationRepositoryEntity
  constructor(estimationRepository: IEstimationRepositoryEntity) {
    this.estimationRepository = estimationRepository
  }
  async execute(_id: string): Promise<estimationOutput | commonOutput> {
    const data = await this.estimationRepository.AggregateEstimationBySpec(_id)
    return ResponseHelper.success(EstimationSuccessMessage.FETCH, data)
  }
}