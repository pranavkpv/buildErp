import { commonOutput } from "../../dto/CommonEntities/common";
import { RecieveOutput } from "../../dto/PurchaseEntity.ts/Receive";
import { IReceiveRepositoryEntity } from "../../../domain/interfaces/Purchase-management/IReceiveRepository";
import { IGetReceiveUseCaseEntity } from "../../interfaces/SitemanagerUseCaseEntities/ReceiveUseCaseEntities/GetRecieveUseCaseEntity";
import { ResponseHelper } from "../../../Shared/responseHelpers/response";
import { ReceiveFailedMessage, ReceiveSuccessMessage } from "../../../Shared/Messages/Receive.Message";

export class GetReceiveUseCase implements IGetReceiveUseCaseEntity {
   private receiveRepository: IReceiveRepositoryEntity
   constructor(receiveRepository: IReceiveRepositoryEntity) {
      this.receiveRepository = receiveRepository
   }
   async execute(search: string, page: number): Promise<RecieveOutput | commonOutput> {
      const { data } = await this.receiveRepository.getReceive(search, page)
      if (!data) {
         return ResponseHelper.badRequest(ReceiveFailedMessage.FETCH)
      }
      return ResponseHelper.success(ReceiveSuccessMessage.FETCH, data)
   }
}