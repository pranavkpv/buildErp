import { IStageRepositoryEntity } from "../../Entities/repositoryEntities/Project-management/IStageRepository";
import { commonOutput } from "../../DTO/CommonEntities/common";
import { fetchcost } from "../../DTO/ProjectEntities/Stage";
import { IFetchStatusUseCaseEntity } from "../../Entities/useCaseEntities/SitemanagerUseCaseEntities/StageStatusUpdationUseCaseEntities/FetchStatusUseCaseEntity";
import { ResponseHelper } from "../../Shared/ResponseHelper/response";
import { StageFailedMessage, StageSuccessMessage } from "../../Shared/Messages/Stage.Message";

export class FetchStatusUseCase implements IFetchStatusUseCaseEntity {
   private stageRepository: IStageRepositoryEntity
   constructor(stageRepository: IStageRepositoryEntity) {
      this.stageRepository = stageRepository
   }
   async execute(input: fetchcost): Promise<commonOutput> {
      const { projectId } = input
      const data = await this.stageRepository.findStageByprojectId(projectId)
      if (data.length == 0) {
         return ResponseHelper.badRequest(StageFailedMessage.NOT_SET)
      }
      return ResponseHelper.success(StageSuccessMessage.FETCH, data)
   }
}