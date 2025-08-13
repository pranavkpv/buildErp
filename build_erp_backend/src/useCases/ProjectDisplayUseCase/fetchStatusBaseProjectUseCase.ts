import { commonOutput } from "../../DTO/CommonEntities/common";
import { projectOutput } from "../../DTO/ProjectEntities/project";
import { IprojectRepositoryEntity } from "../../Entities/repositoryEntities/Project-management/IProjectRepository";
import { IFetchStatusBaseProjectUseCaseEntity } from "../../Entities/useCaseEntities/UserUseCaseEntities/ProjectDisplayUseCaseEntities/FetchStatusBaseProjectUseCaseEntity";
import { HTTP_STATUS } from "../../Shared/Status_code";
import { ProjectSuccessMessage } from "../../Shared/Messages/Project.Message";

export class FetchStatusBaseProjectUseCase implements IFetchStatusBaseProjectUseCaseEntity {
   private projectRepository: IprojectRepositoryEntity
   constructor(projectRepository: IprojectRepositoryEntity) {
      this.projectRepository = projectRepository
   }
   async execute(status: string, search: string, area: number, page: number): Promise<projectOutput | commonOutput> {
      const { data, totalPage, areas } = await this.projectRepository.findStatusBaseProject({ status, search, area, page })
      return {
         success: true,
         message: ProjectSuccessMessage.FETCH,
         status_code: HTTP_STATUS.OK,
         data,
         totalPage,
         areas
      }
   }
}