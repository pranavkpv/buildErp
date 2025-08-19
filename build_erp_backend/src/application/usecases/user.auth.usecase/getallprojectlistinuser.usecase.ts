import { IprojectRepositoryEntity } from "../../../domain/interfaces/Project-management/IProjectRepository";
import { IGetAllProjectListInUserusecase } from "../../interfaces/useCase.Entity/Auth.UseCase/IGetallproject.usecase";
import { ProjectSuccessMessage } from "../../../Shared/Messages/Project.Message";
import { ResponseHelper } from "../../../Shared/responseHelpers/response";
import { commonOutput } from "../../dto/common";
import { IProjectmapper } from "../../../domain/mappers/IProject.mapper";
import { publicProjectDTO } from "../../dto/project.dto";

export class GetAllProjectListInUserUseCase implements IGetAllProjectListInUserusecase {
   constructor(
      private _projectRepository: IprojectRepositoryEntity,
      private _projectmapper: IProjectmapper
   ) { }
   async execute(): Promise<commonOutput<publicProjectDTO[]>> {
      const projectList = await this._projectRepository.fetchProject()
      const mappedProjectData = this._projectmapper.toPublicProjectDto(projectList)
      return ResponseHelper.success(ProjectSuccessMessage.FETCH, mappedProjectData)
   }
}