import { ResponseHelper } from "../../../Shared/responseHelpers/response"
import { ProjectSuccessMessage } from "../../../Shared/Messages/Project.Message"
import { IChangeStatusUseCase } from "../../interfaces/AdminUseCaseEntities/ProjectUseCaseEntities/ChangeStatusEntity"
import { IprojectRepository } from "../../../domain/interfaces/Project-management/IProjectRepository"
import { commonOutput } from "../../dto/common"


export class ChangeStatusUseCase implements IChangeStatusUseCase {
   constructor(
      private projectRepository: IprojectRepository
   ) { }
   async execute(_id: string, status: string): Promise<commonOutput> {
      await this.projectRepository.changeProjectStatus(_id, status)
      return ResponseHelper.success(ProjectSuccessMessage.STATUS_CHANGE + status)
   }
}

