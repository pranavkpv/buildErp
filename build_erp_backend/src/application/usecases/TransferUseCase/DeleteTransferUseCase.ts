import { commonOutput } from "../../dto/CommonEntities/common";
import { IDeleteTransferUseCaseEntity } from "../../interfaces/SitemanagerUseCaseEntities/TransferUseCaseEntities/DeleteTransferUsecaseEntity";
import { ResponseHelper } from "../../../Shared/responseHelpers/response";
import { ITransferRepositoryEntity } from "../../../domain/interfaces/Purchase-management/ITransferRepository";
import { TransferFailedMessage, TransferSuccessMessage } from "../../../Shared/Messages/Transfer.Message";

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