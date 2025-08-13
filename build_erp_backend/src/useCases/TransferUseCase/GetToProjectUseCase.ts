import { commonOutput } from "../../DTO/CommonEntities/common";
import { TransferOutput } from "../../DTO/PurchaseEntity.ts/Transfer";
import { IGetToProjectUseCaseEntity } from "../../Entities/useCaseEntities/SitemanagerUseCaseEntities/TransferUseCaseEntities/GetToProjectUseCaseEntity";
import { ResponseHelper } from "../../Shared/ResponseHelper/response";
import { ITransferRepositoryEntity } from "../../Entities/repositoryEntities/Purchase-management/ITransferRepository";
import { ProjectSuccessMessage } from "../../Shared/Messages/Project.Message";

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