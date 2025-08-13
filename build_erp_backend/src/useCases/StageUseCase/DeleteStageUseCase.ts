import { commonOutput } from "../../DTO/CommonEntities/common";
import { IStageRepositoryEntity } from "../../Entities/repositoryEntities/Project-management/IStageRepository";
import { IDeleteStageUseCaseEntity } from "../../Entities/useCaseEntities/AdminUseCaseEntities/StageUseCaseEntities/DeleteStageEntity";
import { ResponseHelper } from "../../Shared/ResponseHelper/response";
import { StageFailedMessage, StageSuccessMessage } from "../../Shared/Messages/Stage.Message";

export class DeleteStageUseCase implements IDeleteStageUseCaseEntity {
   private stageRepository: IStageRepositoryEntity
   constructor(stageRepository: IStageRepositoryEntity) {
      this.stageRepository = stageRepository
   }
   async execute(input: { deleteId: string }): Promise<commonOutput> {
      const { deleteId } = input
      const existUpdationOnstage = await this.stageRepository.findStageByprojectId(deleteId)
      for (let element of existUpdationOnstage) {
         if (element.progress > 0) {
            return ResponseHelper.conflictData(StageFailedMessage.ALREADY_USED)
         }
      }
      await this.stageRepository.RemoveDateinProject(deleteId)
      await this.stageRepository.DeleteDtageByproject(deleteId)
      return ResponseHelper.success(StageSuccessMessage.DELETE)
   }
}