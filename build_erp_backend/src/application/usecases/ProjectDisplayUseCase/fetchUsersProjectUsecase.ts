import { IprojectRepository } from "../../../domain/interfaces/Project-management/IProjectRepository";
import { IFetchUserProjectUseCase } from "../../interfaces/UserUseCaseEntities/ProjectDisplayUseCaseEntities/FetchUserProjectUsecaseEntity";
import { ResponseHelper } from "../../../Shared/responseHelpers/response";
import { ProjectSuccessMessage } from "../../../Shared/Messages/Project.Message";
import { commonOutput } from "../../dto/common";
import { userBaseProjectDTO } from "../../dto/project.dto";
import { IProjectmapper } from "../../../domain/mappers/IProject.mapper";

export class FetchUserProjectUseCase implements IFetchUserProjectUseCase {
   constructor(
      private _projectRepository: IprojectRepository,
      private _projectmapper: IProjectmapper
   ) { }
   async execute(_id: string): Promise<commonOutput<userBaseProjectDTO[]> | commonOutput> {
      const projectList = await this._projectRepository.findProjectByUserId(_id)
      const mappedUser = this._projectmapper.touserBaseProjectDto(projectList)
      return ResponseHelper.success(ProjectSuccessMessage.FETCH, mappedUser)
   }
}