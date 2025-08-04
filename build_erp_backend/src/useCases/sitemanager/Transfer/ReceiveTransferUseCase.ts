import { commonOutput } from "../../../Entities/Input-OutputEntities/CommonEntities/common";
import { TransferOutput } from "../../../Entities/Input-OutputEntities/PurchaseEntity.ts/Transfer";
import { ITransferRepository } from "../../../Entities/repositoryEntities/Purchase-management/ITransferRepository";
import { IReceiveTransferUseCase } from "../../../Entities/useCaseEntities/SitemanagerUseCaseEntities/TransferUseCaseEntities/ReceiveTransferUseCaseEntity";
import { ERROR_MESSAGE, SUCCESS_MESSAGE } from "../../../Shared/Message";
import { HTTP_STATUS } from "../../../Shared/Status_code";
import { ResponseHelper } from "../../../Shared/utils/response";

export class ReceiveTransferUseCase implements IReceiveTransferUseCase {
   private transferRepository: ITransferRepository
   constructor(transferRepository: ITransferRepository) {
      this.transferRepository = transferRepository
   }
   async execute(_id: string, date: string): Promise<TransferOutput | commonOutput> {
      try {
         const {data} = await this.transferRepository.findTransferDataByToProjectAndDate(_id, date)
         if (!data) {
            return ResponseHelper.failure(ERROR_MESSAGE.TRANSFER.NOT_EXIST, HTTP_STATUS.CONFLICT)
         }
         return {
            success: true,
            message: SUCCESS_MESSAGE.TRANSFER.FETCH,
            status_code: HTTP_STATUS.OK,
            data
         }
      } catch (error: any) {
         return ResponseHelper.failure(error.message, HTTP_STATUS.INTERNAL_SERVER_ERROR)
      }
   }
}