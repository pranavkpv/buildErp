import { IprojectRepository } from "../../../domain/Entities/IRepository/IProject";
import { IProjectmapper } from "../../../domain/IMappers/IProject.mapper";
import { ProjectFailedMessage, ProjectSuccessMessage } from "../../../Shared/Messages/Project.Message";
import { ResponseHelper } from "../../../Shared/responseHelpers/response";
import { commonOutput } from "../../dto/common";
import { expectedImageDTO } from "../../dto/project.dto";
import { IGetExpectedImageUseCase } from "../../IUseCases/IProject/IGetExpectedImage";

export class GetExpectedImageUseCase implements IGetExpectedImageUseCase {
   constructor(
      private _projectRepository: IprojectRepository,
      private _projectmapper: IProjectmapper
   ) { }
   async execute(projectId: string): Promise<commonOutput<expectedImageDTO[]> | commonOutput> {
      const data = await this._projectRepository.getProjectById(projectId)
      if (!data) {
         return ResponseHelper.conflictData(ProjectFailedMessage.FETCH)
      }
      const mappedData = this._projectmapper.toExpectedImageDto(data)
      return ResponseHelper.success(ProjectSuccessMessage.FETCH,mappedData)
   }
}