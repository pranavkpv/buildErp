import { ResponseHelper } from "../../../Shared/responseHelpers/response";
import { ProjectSuccessMessage } from "../../../Shared/Messages/Project.Message";
import { IDisplayAllProjectUseCase } from "../../interfaces/AdminUseCaseEntities/ProjectUseCaseEntities/DisplayAllProjectEntity";
import { IprojectRepository } from "../../../domain/interfaces/Project-management/IProjectRepository";
import { listingInput } from "../../entities/common.entity";
import { displayProjectDTO } from "../../dto/project.dto";
import { commonOutput } from "../../dto/common";
import { IProjectmapper } from "../../../domain/mappers/IProject.mapper";



export class DisplayAllProjectUseCase implements IDisplayAllProjectUseCase {

   constructor(
      private projectRepository: IprojectRepository,
      private _projectMapper: IProjectmapper
   ) { }
   async execute(input: listingInput): Promise<commonOutput<{ data: displayProjectDTO[], totalPage: number }> | commonOutput> {
      const { getProjectListData, totalPage } = await this.projectRepository.findAllProjectWithUser(input);
      const mappedData = this._projectMapper.todisplayProjectDTO(getProjectListData)
      return ResponseHelper.success(ProjectSuccessMessage.FETCH, { data: mappedData, totalPage })
   }
}
