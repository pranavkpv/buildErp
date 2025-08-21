
import { IUpdateReceiveUseCaseEntity } from "../../interfaces/SitemanagerUseCaseEntities/ReceiveUseCaseEntities/UpdateRecieveUseCaseEntity";

import { ResponseHelper } from "../../../Shared/responseHelpers/response";
import { ReceiveFailedMessage, ReceiveSuccessMessage } from "../../../Shared/Messages/Receive.Message";
import { ReceiveInput } from "../../entities/receive.entity";
import { commonOutput } from "../../dto/common";
import { IReceiveRepository } from "../../../domain/interfaces/Purchase-management/IReceiveRepository";
import { ITransferRepository } from "../../../domain/interfaces/Purchase-management/ITransferRepository";

export class UpdateReceiveUsecase implements IUpdateReceiveUseCaseEntity {
   constructor(
      private receiveRepository: IReceiveRepository,
      private transferRepository: ITransferRepository
   ) { }
   async execute(input: ReceiveInput): Promise<commonOutput> {
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