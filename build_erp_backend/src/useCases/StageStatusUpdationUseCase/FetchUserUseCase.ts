import { chatListOutput } from "../../DTO/Chat.Entities/Chatlist.Entity";
import { commonOutput } from "../../DTO/CommonEntities/common";
import { IprojectRepositoryEntity } from "../../Entities/repositoryEntities/Project-management/IProjectRepository";
import { IFetchUserUsecaseEntity } from "../../Entities/useCaseEntities/SitemanagerUseCaseEntities/StageStatusUpdationUseCaseEntities/FetchUserUseCaseEntity";
import { ProjectSuccessMessage } from "../../Shared/Messages/Project.Message";
import { ResponseHelper } from "../../Shared/ResponseHelper/response";


export class FetchUserUseCase implements IFetchUserUsecaseEntity {
   private projectRepository: IprojectRepositoryEntity
   constructor(projectRepository: IprojectRepositoryEntity) {
      this.projectRepository = projectRepository
   }
   async execute(userId: string): Promise<chatListOutput | commonOutput> {
      const data = await this.projectRepository.findProjectsBySitemanager(userId)
      return ResponseHelper.success(ProjectSuccessMessage.FETCH,data)
   }
}