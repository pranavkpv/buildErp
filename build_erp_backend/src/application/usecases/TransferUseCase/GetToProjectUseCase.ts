import { commonOutput } from "../../dto/CommonEntities/common";
import { TransferOutput } from "../../dto/PurchaseEntity.ts/Transfer";
import { IGetToProjectUseCaseEntity } from "../../interfaces/SitemanagerUseCaseEntities/TransferUseCaseEntities/GetToProjectUseCaseEntity";
import { ResponseHelper } from "../../../Shared/responseHelpers/response";
import { ITransferRepositoryEntity } from "../../../domain/interfaces/Purchase-management/ITransferRepository";
import { ProjectSuccessMessage } from "../../../Shared/Messages/Project.Message";

export class GetToProjectUseCase implements IGetToProjectUseCaseEntity {
   private transferRepository: ITransferRepositoryEntity
   constructor(transferRepository: ITransferRepositoryEntity) {
      this.transferRepository = transferRepository
   }
   async execute(projectId: string): Promise<TransferOutput | commonOutput> {
      const data = await this.transferRepository.fectToproject(projectId)
      return ResponseHelper.success(ProjectSuccessMessage.FETCH,data)
   }
}