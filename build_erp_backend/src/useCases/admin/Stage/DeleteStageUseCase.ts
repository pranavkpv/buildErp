import { commonOutput } from "../../../Entities/Input-OutputEntities/CommonEntities/common";
import { IStageRepository } from "../../../Entities/repositoryEntities/Project-management/IStageRepository";
import { IDeleteStageUseCase } from "../../../Entities/useCaseEntities/AdminUseCaseEntities/StageUseCaseEntities/DeleteStageEntity";
import { ERROR_MESSAGE, SUCCESS_MESSAGE } from "../../../Shared/Message";
import { HTTP_STATUS } from "../../../Shared/Status_code";
import { ResponseHelper } from "../../../Shared/utils/response";

export class DeleteStageUseCase implements IDeleteStageUseCase {
   private stageRepository: IStageRepository
   constructor(stageRepository: IStageRepository) {
      this.stageRepository = stageRepository
   }
   async execute(input: { deleteId: string }): Promise<commonOutput> {
      try {
         const { deleteId } = input
         const existUpdationOnstage = await this.stageRepository.findStageByprojectId(deleteId)
         for (let element of existUpdationOnstage) {
            if (element.progress > 0) {
               return ResponseHelper.failure(ERROR_MESSAGE.STAGE.ALREADY_USED, HTTP_STATUS.CONFLICT)
            }
         }
         await this.stageRepository.RemoveDateinProject(deleteId)
         await this.stageRepository.DeleteDtageByproject(deleteId)
         return ResponseHelper.success(SUCCESS_MESSAGE.STAGE.DELETE, HTTP_STATUS.OK)
      } catch (error: any) {
         return ResponseHelper.failure(error.message, HTTP_STATUS.INTERNAL_SERVER_ERROR)
      }
   }
}