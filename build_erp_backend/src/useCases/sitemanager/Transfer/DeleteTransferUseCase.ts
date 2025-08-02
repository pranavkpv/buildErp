import { commonOutput } from "../../../Entities/Input-OutputEntities/CommonEntities/common";
import { ITransferRepository } from "../../../Entities/repositoryEntities/Purchase-management/ITransferRepository";
import { IDeleteTransferUseCase } from "../../../Entities/useCaseEntities/SitemanagerUseCaseEntities/TransferUseCaseEntities/DeleteTransferUsecaseEntity";
import { ERROR_MESSAGE, SUCCESS_MESSAGE } from "../../../Shared/Message";
import { HTTP_STATUS } from "../../../Shared/Status_code";
import { ResponseHelper } from "../../../Shared/utils/response";

export class DeleteTransferUseCase implements IDeleteTransferUseCase {
   private transferRepository: ITransferRepository
   constructor(transferRepository: ITransferRepository) {
      this.transferRepository = transferRepository
   }
   async execute(_id: string): Promise<commonOutput> {
      try {
         const response = await this.transferRepository.deleteTransfer(_id)
         if (response) {
            return ResponseHelper.success(SUCCESS_MESSAGE.TRANSFER.SAVE, HTTP_STATUS.CREATED)
         } else {
            return ResponseHelper.failure(ERROR_MESSAGE.TRANSFER.ERROR, HTTP_STATUS.BAD_REQUEST)
         }
      } catch (error:any) {
         return ResponseHelper.failure(error.message, HTTP_STATUS.INTERNAL_SERVER_ERROR)
      }
   }
}