import { IListProjectUseCaseEntity } from "../../interfaces/SitemanagerUseCaseEntities/StageStatusUpdationUseCaseEntities/ListProjectUseCaseEntity";
import { ResponseHelper } from "../../../Shared/responseHelpers/response";
import { ProjectSuccessMessage } from "../../../Shared/Messages/Project.Message";
import { IprojectRepository } from "../../../domain/interfaces/Project-management/IProjectRepository";
import { commonOutput } from "../../dto/common";
import { IProjectModelEntity } from "../../../domain/Entities/modelEntities/project.entity";

export class ListProjectUseCase implements IListProjectUseCaseEntity {
   constructor(
      private projectRepository : IprojectRepository
   ){}
   async execute(user:string):Promise<commonOutput<IProjectModelEntity[]> | commonOutput>{
      const data = await this.projectRepository.findSitemanagerProject(user)
      return ResponseHelper.success(ProjectSuccessMessage.FETCH,data)
   }
}