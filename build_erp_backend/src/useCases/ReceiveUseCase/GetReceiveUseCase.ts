import { commonOutput } from "../../DTO/CommonEntities/common";
import { RecieveOutput } from "../../DTO/PurchaseEntity.ts/Receive";
import { IReceiveRepositoryEntity } from "../../Entities/repositoryEntities/Purchase-management/IReceiveRepository";
import { IGetReceiveUseCaseEntity } from "../../Entities/useCaseEntities/SitemanagerUseCaseEntities/ReceiveUseCaseEntities/GetRecieveUseCaseEntity";
import { ResponseHelper } from "../../Shared/ResponseHelper/response";
import { ReceiveFailedMessage, ReceiveSuccessMessage } from "../../Shared/Messages/Receive.Message";

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