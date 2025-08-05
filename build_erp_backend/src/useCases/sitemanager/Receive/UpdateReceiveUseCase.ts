import { commonOutput } from "../../../Entities/Input-OutputEntities/CommonEntities/common";
import { RecieveInput } from "../../../Entities/Input-OutputEntities/PurchaseEntity.ts/Receive";
import { IReceiveRepository } from "../../../Entities/repositoryEntities/Purchase-management/IReceiveRepository";
import { ITransferRepository } from "../../../Entities/repositoryEntities/Purchase-management/ITransferRepository";
import { IUpdateReceiveUseCase } from "../../../Entities/useCaseEntities/SitemanagerUseCaseEntities/ReceiveUseCaseEntities/UpdateRecieveUseCaseEntity";
import { ERROR_MESSAGE, SUCCESS_MESSAGE } from "../../../Shared/Message";
import { HTTP_STATUS } from "../../../Shared/Status_code";
import { ResponseHelper } from "../../../Shared/utils/response";

export class UpdateReceiveUsecase implements IUpdateReceiveUseCase {
   private receiveRepository: IReceiveRepository
   private transferRepository: ITransferRepository
   constructor(receiveRepository: IReceiveRepository, transferRepository: ITransferRepository) {
      this.receiveRepository = receiveRepository
      this.transferRepository = transferRepository
   }
   async execute(input: RecieveInput): Promise<commonOutput> {
      try {
         for (let element of input.transferId) {
         const transferData = await this.transferRepository.findTransferBytransferId(element)
         if (transferData) {
            if (new Date(transferData?.date) > new Date(input.date)) {
               return ResponseHelper.failure(ERROR_MESSAGE.RECEIVE.GREATER_DATE, HTTP_STATUS.CONFLICT)
            }
         }
      }
      const response = await this.receiveRepository.updateReceive(input)
      if (response) {
         return ResponseHelper.success(SUCCESS_MESSAGE.RECEIVE.UPDATE, HTTP_STATUS.OK)
      } else {
         return ResponseHelper.failure(ERROR_MESSAGE.RECEIVE.UPDATE, HTTP_STATUS.OK)
      }
      } catch (error:any) {
          return ResponseHelper.failure(error.message, HTTP_STATUS.INTERNAL_SERVER_ERROR)
      }

   }
}