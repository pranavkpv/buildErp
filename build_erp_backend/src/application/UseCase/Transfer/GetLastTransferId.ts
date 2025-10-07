import { ITransferRepository } from "../../../domain/Entities/IRepository/ITransfer";
import { TransferSuccessMessage } from "../../../Shared/Messages/Transfer.Message";
import { ResponseHelper } from "../../../Shared/responseHelpers/response";
import { commonOutput } from "../../dto/common";
import { IGetLastTransferIdUseCase } from "../../IUseCases/ITransfer/IGetLastTransferId";

export class GetLastTransferIdUseCase implements IGetLastTransferIdUseCase {
   constructor(
      private _transferRepository: ITransferRepository
   ) { }
   async execute(): Promise<commonOutput<number> | commonOutput> {
      const allTransfer = await this._transferRepository.findAllTransfer()
      return ResponseHelper.success(TransferSuccessMessage.FETCH, allTransfer.length + 1)
   }
}