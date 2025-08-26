import { IDeleteReceiveUseCase } from "../../IUseCases/IReceive/IDeleteReceive";
import { ResponseHelper } from "../../../Shared/responseHelpers/response";
import { ReceiveFailedMessage, ReceiveSuccessMessage } from "../../../Shared/Messages/Receive.Message";
import { ITransferRepository } from "../../../domain/Entities/IRepository/ITransfer";
import { IReceiveRepository } from "../../../domain/Entities/IRepository/IReceive";
import { commonOutput } from "../../dto/common";

export class DeleteReceiveUsecase implements IDeleteReceiveUseCase {
   constructor(
      private _receiveRepository: IReceiveRepository,
      private _transferRepository: ITransferRepository
   ) { }
   async execute(_id: string): Promise<commonOutput> {
      const deleteData = await this._receiveRepository.getReceiveById(_id)
      if (!deleteData) {
         return ResponseHelper.serverError(ReceiveFailedMessage.DELETE)
      }
      const response = await this._receiveRepository.deleteReceiveById(_id)
      if (!response) {
         return ResponseHelper.serverError(ReceiveFailedMessage.DELETE)
      }
      await this._transferRepository.updateReceiveStatusToFalse(deleteData.transfer_id)
      return ResponseHelper.success(ReceiveSuccessMessage.DELETE)
   }
}