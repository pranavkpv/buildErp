import { IEstimationRepositoryEntity } from "../../../domain/interfaces/Estimation-management/IEstimationRepository";
import { ISpecRepositoryEntity } from "../../../domain/interfaces/Estimation-management/ISpecRepository";
import { commonOutput } from "../../dto/CommonEntities/common";
import { IDeleteSpecUseCaseEntity } from "../../interfaces/AdminUseCaseEntities/SpecUseCaseEntities/DeleteSpecEntity";
import { ResponseHelper } from "../../../Shared/responseHelpers/response";
import { SpecFailedMessage, SpecSuccessMessage } from "../../../Shared/Messages/Specification.Message";

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