import { IDeleteTransferUseCase } from "../../IUseCases/ITransfer/IDeleteTransfer";
import { ResponseHelper } from "../../../Shared/responseHelpers/response";
import { TransferFailedMessage, TransferSuccessMessage } from "../../../Shared/Messages/Transfer.Message";
import { ITransferRepository } from "../../../domain/Entities/IRepository/ITransfer";
import { commonOutput } from "../../dto/common";

export class DeleteTransferUseCase implements IDeleteTransferUseCase {
   
   constructor(
      private _transferRepository: ITransferRepository
   ) { }
   async execute(_id: string): Promise<commonOutput> {
      const response = await this._transferRepository.deleteTransfer(_id)
      if (response) {
         return ResponseHelper.badRequest(TransferFailedMessage.DELETE)
      }
      return ResponseHelper.success(TransferSuccessMessage.DELETE)
   }
}