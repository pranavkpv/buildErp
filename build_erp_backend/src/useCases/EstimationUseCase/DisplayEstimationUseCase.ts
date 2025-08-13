import { estimationOutput } from "../../DTO/EstimationEntities/estimation";
import { IDisplayEstimationUseCaseEntity } from "../../Entities/useCaseEntities/AdminUseCaseEntities/EstimationUseCaseEntities/DisplayEstimationEntity";
import { commonOutput } from "../../DTO/CommonEntities/common";
import { ResponseHelper } from "../../Shared/ResponseHelper/response";
import { IEstimationRepositoryEntity } from "../../Entities/repositoryEntities/Estimation-management/IEstimationRepository";
import { EstimationSuccessMessage } from "../../Shared/Messages/Estimation.Message";


export class DisplayEstimationUseCase implements IDisplayEstimationUseCaseEntity {
   private estimationRepository: IEstimationRepositoryEntity
   constructor(estimationRepository: IEstimationRepositoryEntity) {
      this.estimationRepository = estimationRepository
   }
   async axecute(search: string, page: number): Promise<estimationOutput | commonOutput> {
      const { data, totalPage } = await this.estimationRepository.displaySpec({ page, search })
      return ResponseHelper.success(EstimationSuccessMessage.FETCH, data, totalPage)
   }
}