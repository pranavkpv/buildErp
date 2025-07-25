import { IStageRepository } from "../../../Entities/repositoryEntities/Project-management/IStageRepository";
import { commonOutput } from "../../../Entities/Input-OutputEntities/CommonEntities/common";
import { fetchcost } from "../../../Entities/Input-OutputEntities/ProjectEntities/Stage";
import { IFetchStatusUseCase } from "../../../Entities/useCaseEntities/SitemanagerUseCaseEntities/StageStatusUpdationUseCaseEntities/FetchStatusUseCaseEntity";
import { ResponseHelper } from "../../../Shared/utils/response";
import { ERROR_MESSAGE } from "../../../Shared/Message";
import { HTTP_STATUS } from "../../../Shared/Status_code";

export class FetchStatusUseCase implements IFetchStatusUseCase {
   private stageRepository: IStageRepository
   constructor(stageRepository: IStageRepository) {
      this.stageRepository = stageRepository
   }
   async execute(input: fetchcost): Promise<commonOutput> {
      const { projectId } = input
      const data = await this.stageRepository.findStageByprojectId(projectId)
      if (data.length == 0) {
         return ResponseHelper.failure(ERROR_MESSAGE.STAGE.NOT_SET, HTTP_STATUS.OK)
      }
      return ResponseHelper.success(data, HTTP_STATUS.OK)
   }
}