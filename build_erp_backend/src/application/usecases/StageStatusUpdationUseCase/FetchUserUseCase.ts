import { chatListOutput } from "../../dto/Chat.Entities/Chatlist.Entity";
import { commonOutput } from "../../dto/CommonEntities/common";
import { IprojectRepositoryEntity } from "../../../domain/interfaces/Project-management/IProjectRepository";
import { IFetchUserUsecaseEntity } from "../../interfaces/SitemanagerUseCaseEntities/StageStatusUpdationUseCaseEntities/FetchUserUseCaseEntity";
import { ProjectSuccessMessage } from "../../../Shared/Messages/Project.Message";
import { ResponseHelper } from "../../../Shared/responseHelpers/response";


export class FetchUserUseCase implements IFetchUserUsecaseEntity {
   private projectRepository: IprojectRepositoryEntity
   constructor(projectRepository: IprojectRepositoryEntity) {
      this.projectRepository = projectRepository
   }
   async execute(userId: string): Promise<chatListOutput | commonOutput> {
      const data = await this.projectRepository.findProjectsBySitemanager(userId)
      return ResponseHelper.success(ProjectSuccessMessage.FETCH,data)
   }
}