import { commonOutput } from "../../../Entities/Input-OutputEntities/CommonEntities/common";
import { RecieveInput } from "../../../Entities/Input-OutputEntities/PurchaseEntity.ts/Receive";
import { IReceiveRepository } from "../../../Entities/repositoryEntities/Purchase-management/IReceiveRepository";
import { ITransferRepository } from "../../../Entities/repositoryEntities/Purchase-management/ITransferRepository";
import { ISaveReceiveUseCase } from "../../../Entities/useCaseEntities/SitemanagerUseCaseEntities/ReceiveUseCaseEntities/SaveReceiveUseCaseEntity";
import { ERROR_MESSAGE, SUCCESS_MESSAGE } from "../../../Shared/Message";
import { HTTP_STATUS } from "../../../Shared/Status_code";
import { ResponseHelper } from "../../../Shared/utils/response";

export class SaveReceiveUseCase implements ISaveReceiveUseCase {
   private ReceiveRepository: IReceiveRepository
   private transferRepository: ITransferRepository
   constructor(ReceiveRepository: IReceiveRepository, transferRepository: ITransferRepository) {
      this.ReceiveRepository = ReceiveRepository
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
         const response = await this.ReceiveRepository.saveReceive(input)
         if (response) {
            await this.transferRepository.UpdateReceiveStatus(input.transferId)
            return ResponseHelper.success(SUCCESS_MESSAGE.RECEIVE.ADD, HTTP_STATUS.CREATED)
         } else {
            return ResponseHelper.failure(ERROR_MESSAGE.RECEIVE.ERROR, HTTP_STATUS.BAD_REQUEST)
         }
      } catch (error: any) {
         return ResponseHelper.failure(error.message, HTTP_STATUS.INTERNAL_SERVER_ERROR)
      }
   }
}