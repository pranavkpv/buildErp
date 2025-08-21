
import { IDeleteReceiveUsecaseEntity } from "../../interfaces/SitemanagerUseCaseEntities/ReceiveUseCaseEntities/DeleteReceiveUseCaseEntity";
import { ResponseHelper } from "../../../Shared/responseHelpers/response";
import { ReceiveFailedMessage, ReceiveSuccessMessage } from "../../../Shared/Messages/Receive.Message";
import { ITransferRepository } from "../../../domain/interfaces/Purchase-management/ITransferRepository";
import { IReceiveRepository } from "../../../domain/interfaces/Purchase-management/IReceiveRepository";
import { commonOutput } from "../../dto/common";

export class DeleteReceiveUsecase implements IDeleteReceiveUsecaseEntity {

   constructor(
      private receiveRepository: IReceiveRepository,
      private transferRepository: ITransferRepository
   ) { }
   async execute(_id: string): Promise<commonOutput> {
      const deleteData = await this.receiveRepository.getReceiveById(_id)
      if (!deleteData) {
         return ResponseHelper.serverError(ReceiveFailedMessage.DELETE)
      }
      const response = await this.receiveRepository.deleteReceiveById(_id)
      if (!response) {
         return ResponseHelper.serverError(ReceiveFailedMessage.DELETE)
      }
      await this.transferRepository.updateReceiveStatusToFalse(deleteData.transfer_id)
      return ResponseHelper.success(ReceiveSuccessMessage.DELETE)
   }
}