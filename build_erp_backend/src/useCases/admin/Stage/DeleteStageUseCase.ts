import { commonOutput } from "../../../Entities/Input-OutputEntities/CommonEntities/common";
import { IStageRepository } from "../../../Entities/repositoryEntities/Project-management/IStageRepository";
import { IDeleteStageUseCase } from "../../../Entities/useCaseEntities/AdminUseCaseEntities/StageUseCaseEntities/DeleteStageEntity";
import { SUCCESS_MESSAGE } from "../../../Shared/Message";
import { HTTP_STATUS } from "../../../Shared/Status_code";
import { ResponseHelper } from "../../../Shared/utils/response";

export class DeleteStageUseCase implements IDeleteStageUseCase {
   private stageRepository: IStageRepository
   constructor(stageRepository: IStageRepository) {
      this.stageRepository = stageRepository
   }
   async execute(input: { deleteId: string }): Promise<commonOutput> {
      const { deleteId } = input
      await this.stageRepository.RemoveDateinProject(deleteId)
      await this.stageRepository.DeleteDtageByproject(deleteId)
      return ResponseHelper.success(SUCCESS_MESSAGE.STAGE.DELETE, HTTP_STATUS.OK)
   }
}