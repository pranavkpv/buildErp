import { IEditProjectUseCase } from "../../IUseCases/IProject/IEditProject"
import { ResponseHelper } from "../../../Shared/responseHelpers/response"
import { ProjectFailedMessage, ProjectSuccessMessage } from "../../../Shared/Messages/Project.Message"
import { editProjectInput } from "../../Entities/project.entity"
import { IprojectRepository } from "../../../domain/Entities/IRepository/IProject"
import { commonOutput } from "../../dto/common"


export class EditProjectUseCase implements IEditProjectUseCase {
   constructor(
      private _projectRepository: IprojectRepository
   ) { }
   async execute(input: editProjectInput): Promise<commonOutput> {
      const { _id, project_name, user_id, address, mobile_number, email, area, description, latitude, longitude } = input
      const existData = await this._projectRepository.checkDuplicateProjectInEdit(_id, project_name)
      if (existData) {
         return ResponseHelper.conflictData(ProjectFailedMessage.EXIST_PROJECT)
      }
      await this._projectRepository.UpdateProjectById({ _id, project_name, user_id, address, mobile_number, email, area, description, latitude, longitude })
      return ResponseHelper.success(ProjectSuccessMessage.UPDATE)
   }
}

