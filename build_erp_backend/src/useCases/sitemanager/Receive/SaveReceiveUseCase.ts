import { commonOutput } from "../../../Entities/Input-OutputEntities/CommonEntities/common";
import { RecieveInput } from "../../../Entities/Input-OutputEntities/PurchaseEntity.ts/Receive";
import { IReceiveRepository } from "../../../Entities/repositoryEntities/Purchase-management/IReceiveRepository";
import { ISaveReceiveUseCase } from "../../../Entities/useCaseEntities/SitemanagerUseCaseEntities/ReceiveUseCaseEntities/SaveReceiveUseCaseEntity";
import { ERROR_MESSAGE, SUCCESS_MESSAGE } from "../../../Shared/Message";
import { HTTP_STATUS } from "../../../Shared/Status_code";
import { ResponseHelper } from "../../../Shared/utils/response";

export class SaveReceiveUseCase implements ISaveReceiveUseCase {
   private ReceiveRepository: IReceiveRepository
   constructor(ReceiveRepository: IReceiveRepository) {
      this.ReceiveRepository = ReceiveRepository
   }
   async execute(input: RecieveInput): Promise<commonOutput> {
      try {
         const response = await this.ReceiveRepository.saveReceive(input)
         if (response) {
            return ResponseHelper.success(SUCCESS_MESSAGE.RECEIVE.ADD, HTTP_STATUS.OK)
         } else {
            return ResponseHelper.failure(ERROR_MESSAGE.RECEIVE.ERROR, HTTP_STATUS.BAD_REQUEST)
         }
      } catch (error: any) {
         return ResponseHelper.failure(error.message, HTTP_STATUS.INTERNAL_SERVER_ERROR)
      }
   }
}