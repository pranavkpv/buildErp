import { IDeleteTransferUseCaseEntity } from "../../interfaces/SitemanagerUseCaseEntities/TransferUseCaseEntities/DeleteTransferUsecaseEntity";
import { ResponseHelper } from "../../../Shared/responseHelpers/response";
import { TransferFailedMessage, TransferSuccessMessage } from "../../../Shared/Messages/Transfer.Message";
import { ITransferRepository } from "../../../domain/interfaces/Purchase-management/ITransferRepository";
import { commonOutput } from "../../dto/common";

export class DeleteTransferUseCase implements IDeleteTransferUseCaseEntity {
   
   constructor(
      private transferRepository: ITransferRepository
   ) { }
   async execute(_id: string): Promise<commonOutput> {
      const response = await this.transferRepository.deleteTransfer(_id)
      if (response) {
         return ResponseHelper.badRequest(TransferFailedMessage.DELETE)
      }
      return ResponseHelper.success(TransferSuccessMessage.DELETE)
   }
}