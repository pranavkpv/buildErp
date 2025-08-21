import { IprojectRepository } from "../../../domain/interfaces/Project-management/IProjectRepository";
import { IFetchUserUsecaseEntity } from "../../interfaces/SitemanagerUseCaseEntities/StageStatusUpdationUseCaseEntities/FetchUserUseCaseEntity";
import { ProjectSuccessMessage } from "../../../Shared/Messages/Project.Message";
import { ResponseHelper } from "../../../Shared/responseHelpers/response";
import { commonOutput } from "../../dto/common";
import { chatListDTO } from "../../dto/user.dto";


export class FetchUserUseCase implements IFetchUserUsecaseEntity {
   constructor(private projectRepository: IprojectRepository) { }
   async execute(userId: string): Promise<commonOutput<chatListDTO[]> | commonOutput> {
      const data = await this.projectRepository.findProjectsBySitemanager(userId)
      return ResponseHelper.success(ProjectSuccessMessage.FETCH, data)
   }
}