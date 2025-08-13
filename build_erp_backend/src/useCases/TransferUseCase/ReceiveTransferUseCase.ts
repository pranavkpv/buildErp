import { commonOutput } from "../../DTO/CommonEntities/common";
import { TransferOutput } from "../../DTO/PurchaseEntity.ts/Transfer";
import { IReceiveTransferUseCaseEntity } from "../../Entities/useCaseEntities/SitemanagerUseCaseEntities/TransferUseCaseEntities/ReceiveTransferUseCaseEntity";
import { ResponseHelper } from "../../Shared/ResponseHelper/response";
import { ITransferRepositoryEntity } from "../../Entities/repositoryEntities/Purchase-management/ITransferRepository";
import { TransferFailedMessage, TransferSuccessMessage } from "../../Shared/Messages/Transfer.Message";

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