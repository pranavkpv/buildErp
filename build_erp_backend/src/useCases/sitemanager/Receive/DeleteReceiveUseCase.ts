import { commonOutput } from "../../../Entities/Input-OutputEntities/CommonEntities/common";
import { IReceiveRepository } from "../../../Entities/repositoryEntities/Purchase-management/IReceiveRepository";
import { ITransferRepository } from "../../../Entities/repositoryEntities/Purchase-management/ITransferRepository";
import { IDeleteReceiveUsecase } from "../../../Entities/useCaseEntities/SitemanagerUseCaseEntities/ReceiveUseCaseEntities/DeleteReceiveUseCaseEntity";
import { ERROR_MESSAGE, SUCCESS_MESSAGE } from "../../../Shared/Message";
import { HTTP_STATUS } from "../../../Shared/Status_code";
import { ResponseHelper } from "../../../Shared/utils/response";

export class DeleteReceiveUsecase implements IDeleteReceiveUsecase {
   private receiveRepository: IReceiveRepository
   private transferRepository: ITransferRepository
   constructor(receiveRepository: IReceiveRepository, transferRepository: ITransferRepository) {
      this.receiveRepository = receiveRepository
      this.transferRepository = transferRepository
   }
   async execute(_id: string): Promise<commonOutput> {
      try {
         const deleteData = await this.receiveRepository.getReceiveById(_id)
         if (!deleteData) {
            return ResponseHelper.failure(ERROR_MESSAGE.RECEIVE.DELETE, HTTP_STATUS.INTERNAL_SERVER_ERROR)
         }
         const response = await this.receiveRepository.deleteReceiveById(_id)
         if (response) {
            await this.transferRepository.updateReceiveStatusToFalse(deleteData.transfer_id)
            return ResponseHelper.success(SUCCESS_MESSAGE.RECEIVE.DELETE, HTTP_STATUS.OK)
         } else {
            return ResponseHelper.failure(ERROR_MESSAGE.RECEIVE.DELETE, HTTP_STATUS.INTERNAL_SERVER_ERROR)
         }
      } catch (error: any) {
         return ResponseHelper.failure(error.message, HTTP_STATUS.INTERNAL_SERVER_ERROR)
      }
   }
}