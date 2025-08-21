import { IGetToProjectUseCaseEntity } from "../../interfaces/SitemanagerUseCaseEntities/TransferUseCaseEntities/GetToProjectUseCaseEntity";
import { ResponseHelper } from "../../../Shared/responseHelpers/response";
import { ProjectSuccessMessage } from "../../../Shared/Messages/Project.Message";
import { ITransferRepository } from "../../../domain/interfaces/Purchase-management/ITransferRepository";
import { commonOutput } from "../../dto/common";
import { fetchProjectIdnameDTO } from "../../dto/project.dto";

export class GetToProjectUseCase implements IGetToProjectUseCaseEntity {
   constructor(
      private transferRepository: ITransferRepository
   ) { }
   async execute(projectId: string): Promise<commonOutput<fetchProjectIdnameDTO[]> | commonOutput> {
      const data = await this.transferRepository.fectToproject(projectId)
      return ResponseHelper.success(ProjectSuccessMessage.FETCH, data)
   }
}