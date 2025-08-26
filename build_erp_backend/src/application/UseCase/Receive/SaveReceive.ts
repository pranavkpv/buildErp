import { ISaveReceiveUseCase } from "../../IUseCases/IReceive/ISaveReceive";
import { ResponseHelper } from "../../../Shared/responseHelpers/response";
import { ReceiveFailedMessage, ReceiveSuccessMessage } from "../../../Shared/Messages/Receive.Message";
import { ReceiveInput } from "../../Entities/receive.entity";
import { commonOutput } from "../../dto/common";
import { ITransferRepository } from "../../../domain/Entities/IRepository/ITransfer";
import { IReceiveRepository } from "../../../domain/Entities/IRepository/IReceive";

export class SaveReceiveUseCase implements ISaveReceiveUseCase {
   constructor(
      private _ReceiveRepository: IReceiveRepository,
      private _TransferRepository: ITransferRepository
   ) { }
   async execute(input: ReceiveInput): Promise<commonOutput> {
      for (let element of input.transferId) {
         const transferData = await this._TransferRepository.findTransferBytransferId(element)
         if (transferData) {
            if (new Date(transferData?.date) > new Date(input.date)) {
               return ResponseHelper.conflictData(ReceiveFailedMessage.GREATER_DATE)
            }
         }
      }
      const response = await this._ReceiveRepository.createReceive(input)
      if (!response) {
         return ResponseHelper.badRequest(ReceiveFailedMessage.SAVE)
      }
      await this._TransferRepository.UpdateReceiveStatus(input.transferId)
      return ResponseHelper.createdSuccess(ReceiveSuccessMessage.SAVE)
   }
}