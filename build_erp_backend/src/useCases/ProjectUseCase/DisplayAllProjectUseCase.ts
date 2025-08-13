import { commonOutput } from "../../DTO/CommonEntities/common";
import { projectOutput } from "../../DTO/ProjectEntities/project";
import { IprojectRepositoryEntity } from "../../Entities/repositoryEntities/Project-management/IProjectRepository";
import { IDisplayAllProjectUseCaseEntity } from "../../Entities/useCaseEntities/AdminUseCaseEntities/ProjectUseCaseEntities/DisplayAllProjectEntity";
import { ResponseHelper } from "../../Shared/ResponseHelper/response";
import { ProjectSuccessMessage } from "../../Shared/Messages/Project.Message";



export class DisplayAllProjectUseCase implements IDisplayAllProjectUseCaseEntity {
   private projectRepository: IprojectRepositoryEntity
   constructor(projectRepository: IprojectRepositoryEntity) {
      this.projectRepository = projectRepository
   }
   async execute(page: number, search: string): Promise<projectOutput | commonOutput> {
      const { getProjectListData, totalPage } = await this.projectRepository.findAllProjectWithUser({page, search});
      return ResponseHelper.success(ProjectSuccessMessage.FETCH, getProjectListData, totalPage)
   }
}
