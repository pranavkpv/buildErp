import { commonOutput } from "../../dto/CommonEntities/common";
import { TransferOutput } from "../../dto/PurchaseEntity.ts/Transfer";
import { IReceiveTransferUseCaseEntity } from "../../interfaces/SitemanagerUseCaseEntities/TransferUseCaseEntities/ReceiveTransferUseCaseEntity";
import { ResponseHelper } from "../../../Shared/responseHelpers/response";
import { ITransferRepositoryEntity } from "../../../domain/interfaces/Purchase-management/ITransferRepository";
import { TransferFailedMessage, TransferSuccessMessage } from "../../../Shared/Messages/Transfer.Message";

export class ReceiveTransferUseCase implements IReceiveTransferUseCaseEntity {
   private transferRepository: ITransferRepositoryEntity
   constructor(transferRepository: ITransferRepositoryEntity) {
      this.transferRepository = transferRepository
   }
   async execute(_id: string, date: string): Promise<TransferOutput | commonOutput> {
      const { data } = await this.transferRepository.findTransferDataByToProjectAndDate(_id, date)
      if (!data) {
         return ResponseHelper.conflictData(TransferFailedMessage.NOT_EXIST)
      }
      return ResponseHelper.success(TransferSuccessMessage.FETCH, data)
   }
}