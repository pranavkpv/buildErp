import { IEstimationRepositoryEntity } from "../../Entities/repositoryEntities/Estimation-management/IEstimationRepository";
import { ISpecRepositoryEntity } from "../../Entities/repositoryEntities/Estimation-management/ISpecRepository";
import { commonOutput } from "../../DTO/CommonEntities/common";
import { IDeleteSpecUseCaseEntity } from "../../Entities/useCaseEntities/AdminUseCaseEntities/SpecUseCaseEntities/DeleteSpecEntity";
import { ResponseHelper } from "../../Shared/ResponseHelper/response";
import { SpecFailedMessage, SpecSuccessMessage } from "../../Shared/Messages/Specification.Message";

export class DeleteSpecUseCase implements IDeleteSpecUseCaseEntity {
   private specRepository: ISpecRepositoryEntity
   private estimationRepostory: IEstimationRepositoryEntity
   constructor(specRepository: ISpecRepositoryEntity, estimationRepostory: IEstimationRepositoryEntity) {
      this.specRepository = specRepository
      this.estimationRepostory = estimationRepostory
   }
   async execute(_id: string): Promise<commonOutput> {
         const existEstimationBySpec = await this.estimationRepostory.findEstimationBySpecId(_id)
         if (existEstimationBySpec) {
            return ResponseHelper.conflictData(SpecFailedMessage.USED_ESTIMATION)
         }
         await this.specRepository.DeleteSpec(_id)
         return ResponseHelper.success(SpecSuccessMessage.DELETE)
   }
}