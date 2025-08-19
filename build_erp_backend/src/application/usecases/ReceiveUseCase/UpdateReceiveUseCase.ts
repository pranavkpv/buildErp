import { commonOutput } from "../../dto/CommonEntities/common";
import { RecieveInput } from "../../dto/PurchaseEntity.ts/Receive";
import { IReceiveRepositoryEntity } from "../../../domain/interfaces/Purchase-management/IReceiveRepository";
import { ITransferRepositoryEntity } from "../../../domain/interfaces/Purchase-management/ITransferRepository";
import { IUpdateReceiveUseCaseEntity } from "../../interfaces/SitemanagerUseCaseEntities/ReceiveUseCaseEntities/UpdateRecieveUseCaseEntity";

import { ResponseHelper } from "../../../Shared/responseHelpers/response";
import { ReceiveFailedMessage, ReceiveSuccessMessage } from "../../../Shared/Messages/Receive.Message";

export class UpdateReceiveUsecase implements IUpdateReceiveUseCaseEntity {
   private receiveRepository: IReceiveRepositoryEntity
   private transferRepository: ITransferRepositoryEntity
   constructor(receiveRepository: IReceiveRepositoryEntity, transferRepository: ITransferRepositoryEntity) {
      this.receiveRepository = receiveRepository
      this.transferRepository = transferRepository
   }
   async execute(input: RecieveInput): Promise<commonOutput> {
      for (let element of input.transferId) {
         const transferData = await this.transferRepository.findTransferBytransferId(element)
         if (transferData) {
            if (new Date(transferData?.date) > new Date(input.date)) {
               return ResponseHelper.conflictData(ReceiveFailedMessage.GREATER_DATE)
            }
         }
      }
      const response = await this.receiveRepository.updateReceive(input)
      if (response) {
         return ResponseHelper.serverError(ReceiveFailedMessage.UPDATE)
      }
      return ResponseHelper.success(ReceiveSuccessMessage.UPDATE)
   }
}