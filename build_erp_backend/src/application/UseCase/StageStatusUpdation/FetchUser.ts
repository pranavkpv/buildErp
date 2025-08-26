import { IprojectRepository } from "../../../domain/Entities/IRepository/IProject";
import { IFetchUserUseCase } from "../../IUseCases/IStageStatusUpdation/IFetchUser";
import { ProjectSuccessMessage } from "../../../Shared/Messages/Project.Message";
import { ResponseHelper } from "../../../Shared/responseHelpers/response";
import { commonOutput } from "../../dto/common";
import { chatListDTO } from "../../dto/user.dto";


export class FetchUserUseCase implements IFetchUserUseCase {
   constructor(
      private _projectRepository: IprojectRepository
   ) { }
   async execute(userId: string): Promise<commonOutput<chatListDTO[]> | commonOutput> {
      const data = await this._projectRepository.getSitemanagerChatProjects(userId)
      return ResponseHelper.success(ProjectSuccessMessage.FETCH, data)
   }
}