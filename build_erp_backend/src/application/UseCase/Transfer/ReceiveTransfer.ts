import { IReceiveTransferUseCase } from "../../IUseCases/ITransfer/IReceiveTransfer";
import { ResponseHelper } from "../../../Shared/responseHelpers/response";
import { TransferFailedMessage, TransferSuccessMessage } from "../../../Shared/Messages/Transfer.Message";
import { ITransferRepository } from "../../../domain/Entities/IRepository/ITransfer";
import { commonOutput } from "../../dto/common";
import { TransferOutput } from "../../dto/transfer.dto";

export class ReceiveTransferUseCase implements IReceiveTransferUseCase {
   
   constructor(
      private _transferRepository: ITransferRepository
   ) { }
   async execute(_id: string, date: string): Promise<commonOutput<TransferOutput[]> | commonOutput>{
      const data  = await this._transferRepository.findTransferDataByToProjectAndDate(_id, date)
      if (!data) {
         return ResponseHelper.conflictData(TransferFailedMessage.NOT_EXIST)
      }
      return ResponseHelper.success(TransferSuccessMessage.FETCH, data)
   }
}