import { commonOutput } from "../../../Entities/Input-OutputEntities/CommonEntities/common";
import { RecieveOutput } from "../../../Entities/Input-OutputEntities/PurchaseEntity.ts/Receive";
import { IReceiveRepository } from "../../../Entities/repositoryEntities/Purchase-management/IReceiveRepository";
import { IGetReceiveUseCase } from "../../../Entities/useCaseEntities/SitemanagerUseCaseEntities/ReceiveUseCaseEntities/GetRecieveUseCaseEntity";
import { ERROR_MESSAGE, SUCCESS_MESSAGE } from "../../../Shared/Message";
import { HTTP_STATUS } from "../../../Shared/Status_code";
import { ResponseHelper } from "../../../Shared/utils/response";

export class GetReceiveUseCase implements IGetReceiveUseCase {
   private receiveRepository: IReceiveRepository
   constructor(receiveRepository: IReceiveRepository) {
      this.receiveRepository = receiveRepository
   }
   async execute(search: string, page: number): Promise<RecieveOutput | commonOutput> {
      try {
         const { data } = await this.receiveRepository.getReceive(search, page)
         if (data) {
            return {
               success:true,
               message:SUCCESS_MESSAGE.RECEIVE.FETCH,
               status_code:HTTP_STATUS.OK,
               data
            }
         } else {
            return ResponseHelper.failure(ERROR_MESSAGE.RECEIVE.FETCH, HTTP_STATUS.BAD_REQUEST)
         }
      } catch (error: any) {
         return ResponseHelper.failure(error.message, HTTP_STATUS.INTERNAL_SERVER_ERROR)
      }
   }
}