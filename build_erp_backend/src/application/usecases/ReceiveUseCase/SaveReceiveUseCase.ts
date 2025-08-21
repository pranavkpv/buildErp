
import { ISaveReceiveUseCaseEntity } from "../../interfaces/SitemanagerUseCaseEntities/ReceiveUseCaseEntities/SaveReceiveUseCaseEntity";
import { ResponseHelper } from "../../../Shared/responseHelpers/response";
import { ReceiveFailedMessage, ReceiveSuccessMessage } from "../../../Shared/Messages/Receive.Message";
import { ReceiveInput } from "../../entities/receive.entity";
import { commonOutput } from "../../dto/common";
import { ITransferRepository } from "../../../domain/interfaces/Purchase-management/ITransferRepository";
import { IReceiveRepository } from "../../../domain/interfaces/Purchase-management/IReceiveRepository";

export class SaveReceiveUseCase implements ISaveReceiveUseCaseEntity {
   constructor(
      private ReceiveRepository: IReceiveRepository,
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
      const response = await this.ReceiveRepository.saveReceive(input)
      if (!response) {
         return ResponseHelper.badRequest(ReceiveFailedMessage.SAVE)
      }
      await this.transferRepository.UpdateReceiveStatus(input.transferId)
      return ResponseHelper.createdSuccess(ReceiveSuccessMessage.SAVE)
   }
}