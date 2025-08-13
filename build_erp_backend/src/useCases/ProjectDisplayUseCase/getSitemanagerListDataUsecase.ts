import { chatListOutput } from "../../DTO/Chat.Entities/Chatlist.Entity";
import { commonOutput } from "../../DTO/CommonEntities/common";
import { IprojectRepositoryEntity } from "../../Entities/repositoryEntities/Project-management/IProjectRepository";
import { IGetSitemanagerListDataUseCaseEntity } from "../../Entities/useCaseEntities/UserUseCaseEntities/ProjectDisplayUseCaseEntities/GetSitemanagerListUseCase";
import { ResponseHelper } from "../../Shared/ResponseHelper/response";
import { ProjectFailedMessage, ProjectSuccessMessage } from "../../Shared/Messages/Project.Message";

export class GetSitemanagerListDataUseCase implements IGetSitemanagerListDataUseCaseEntity {
   private projectRepository: IprojectRepositoryEntity
   constructor(projectRepository: IprojectRepositoryEntity) {
      this.projectRepository = projectRepository
   }
   async execute(_id: string): Promise<chatListOutput | commonOutput> {
      const projectData = await this.projectRepository.findAggreagateProjectsByUserId(_id)
      if (projectData.length == 0 || !projectData) {
         return ResponseHelper.conflictData(ProjectFailedMessage.NOT_ADD_SITEMANAGER)
      }
      return ResponseHelper.success(ProjectSuccessMessage.FETCH, projectData)
   }
}