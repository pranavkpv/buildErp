import { IReceiveTransferUseCaseEntity } from "../../interfaces/SitemanagerUseCaseEntities/TransferUseCaseEntities/ReceiveTransferUseCaseEntity";
import { ResponseHelper } from "../../../Shared/responseHelpers/response";
import { TransferFailedMessage, TransferSuccessMessage } from "../../../Shared/Messages/Transfer.Message";
import { ITransferRepository } from "../../../domain/interfaces/Purchase-management/ITransferRepository";
import { commonOutput } from "../../dto/common";
import { TransferOutput } from "../../dto/transfer.dto";

export class ReceiveTransferUseCase implements IReceiveTransferUseCaseEntity {
   
   constructor(
      private transferRepository: ITransferRepository
   ) { }
   async execute(_id: string, date: string): Promise<commonOutput<TransferOutput[]> | commonOutput>{
      const data  = await this.transferRepository.findTransferDataByToProjectAndDate(_id, date)
      if (!data) {
         return ResponseHelper.conflictData(TransferFailedMessage.NOT_EXIST)
      }
      return ResponseHelper.success(TransferSuccessMessage.FETCH, data)
   }
}