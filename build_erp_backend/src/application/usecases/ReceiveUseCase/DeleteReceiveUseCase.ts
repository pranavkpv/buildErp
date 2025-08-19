import { commonOutput } from "../../dto/CommonEntities/common";
import { IReceiveRepositoryEntity } from "../../../domain/interfaces/Purchase-management/IReceiveRepository";
import { ITransferRepositoryEntity } from "../../../domain/interfaces/Purchase-management/ITransferRepository";
import { IDeleteReceiveUsecaseEntity } from "../../interfaces/SitemanagerUseCaseEntities/ReceiveUseCaseEntities/DeleteReceiveUseCaseEntity";
import { ResponseHelper } from "../../../Shared/responseHelpers/response";
import { ReceiveFailedMessage, ReceiveSuccessMessage } from "../../../Shared/Messages/Receive.Message";

export class DeleteReceiveUsecase implements IDeleteReceiveUsecaseEntity {
   private receiveRepository: IReceiveRepositoryEntity
   private transferRepository: ITransferRepositoryEntity
   constructor(receiveRepository: IReceiveRepositoryEntity, transferRepository: ITransferRepositoryEntity) {
      this.receiveRepository = receiveRepository
      this.transferRepository = transferRepository
   }
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