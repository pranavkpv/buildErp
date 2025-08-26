import { ResponseHelper } from "../../../Shared/responseHelpers/response";
import { ProjectSuccessMessage } from "../../../Shared/Messages/Project.Message";
import { IDisplayAllProjectUseCase } from "../../IUseCases/IProject/IDisplayAllProject";
import { IprojectRepository } from "../../../domain/Entities/IRepository/IProject";
import { listingInput } from "../../Entities/common.entity";
import { displayProjectDTO } from "../../dto/project.dto";
import { commonOutput } from "../../dto/common";
import { IProjectmapper } from "../../../domain/mappers/IProject.mapper";



export class DisplayAllProjectUseCase implements IDisplayAllProjectUseCase {
   constructor(
      private _projectRepository: IprojectRepository,
      private _projectMapper: IProjectmapper
   ) { }
   async execute(input: listingInput):
      Promise<commonOutput<{ data: displayProjectDTO[], totalPage: number }> | commonOutput> {
      const { getProjectListData, totalPage } = await this._projectRepository.getAllProjectsWithUser(input)
      const mappedData = this._projectMapper.todisplayProjectDTO(getProjectListData)
      return ResponseHelper.success(ProjectSuccessMessage.FETCH, { data: mappedData, totalPage })
   }
}
