import { commonOutput } from "../../dto/CommonEntities/common";
import { projectOutput } from "../../dto/ProjectEntities/project";
import { IprojectRepositoryEntity } from "../../../domain/interfaces/Project-management/IProjectRepository";
import { IDisplayAllProjectUseCaseEntity } from "../../interfaces/AdminUseCaseEntities/ProjectUseCaseEntities/DisplayAllProjectEntity";
import { ResponseHelper } from "../../../Shared/responseHelpers/response";
import { ProjectSuccessMessage } from "../../../Shared/Messages/Project.Message";



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
