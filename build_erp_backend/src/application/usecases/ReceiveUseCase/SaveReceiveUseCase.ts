import { commonOutput } from "../../dto/CommonEntities/common";
import { RecieveInput } from "../../dto/PurchaseEntity.ts/Receive";
import { IReceiveRepositoryEntity } from "../../../domain/interfaces/Purchase-management/IReceiveRepository";
import { ITransferRepositoryEntity } from "../../../domain/interfaces/Purchase-management/ITransferRepository";
import { ISaveReceiveUseCaseEntity } from "../../interfaces/SitemanagerUseCaseEntities/ReceiveUseCaseEntities/SaveReceiveUseCaseEntity";
import { ResponseHelper } from "../../../Shared/responseHelpers/response";
import { ReceiveFailedMessage, ReceiveSuccessMessage } from "../../../Shared/Messages/Receive.Message";

export class SaveReceiveUseCase implements ISaveReceiveUseCaseEntity {
   private ReceiveRepository: IReceiveRepositoryEntity
   private transferRepository: ITransferRepositoryEntity
   constructor(ReceiveRepository: IReceiveRepositoryEntity, transferRepository: ITransferRepositoryEntity) {
      this.ReceiveRepository = ReceiveRepository
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
      const response = await this.ReceiveRepository.saveReceive(input)
      if (!response) {
         return ResponseHelper.badRequest(ReceiveFailedMessage.SAVE)
      }
      await this.transferRepository.UpdateReceiveStatus(input.transferId)
      return ResponseHelper.createdSuccess(ReceiveSuccessMessage.SAVE)
   }
}