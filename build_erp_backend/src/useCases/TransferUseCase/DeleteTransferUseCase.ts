import { commonOutput } from "../../DTO/CommonEntities/common";
import { IDeleteTransferUseCaseEntity } from "../../Entities/useCaseEntities/SitemanagerUseCaseEntities/TransferUseCaseEntities/DeleteTransferUsecaseEntity";
import { ResponseHelper } from "../../Shared/ResponseHelper/response";
import { ITransferRepositoryEntity } from "../../Entities/repositoryEntities/Purchase-management/ITransferRepository";
import { TransferFailedMessage, TransferSuccessMessage } from "../../Shared/Messages/Transfer.Message";

export class DeleteTransferUseCase implements IDeleteTransferUseCaseEntity {
   private transferRepository: ITransferRepositoryEntity
   constructor(transferRepository: ITransferRepositoryEntity) {
      this.transferRepository = transferRepository
   }
   async execute(_id: string): Promise<commonOutput> {
      const response = await this.transferRepository.deleteTransfer(_id)
      if (response) {
         return ResponseHelper.badRequest(TransferFailedMessage.DELETE)
      }
      return ResponseHelper.success(TransferSuccessMessage.DELETE)
   }
}