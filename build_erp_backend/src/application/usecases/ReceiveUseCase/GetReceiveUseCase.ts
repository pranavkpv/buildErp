import { IGetReceiveUseCaseEntity } from "../../interfaces/SitemanagerUseCaseEntities/ReceiveUseCaseEntities/GetRecieveUseCaseEntity";
import { ResponseHelper } from "../../../Shared/responseHelpers/response";
import { ReceiveFailedMessage, ReceiveSuccessMessage } from "../../../Shared/Messages/Receive.Message";
import { IReceiveRepository } from "../../../domain/interfaces/Purchase-management/IReceiveRepository";
import { commonOutput } from "../../dto/common";
import { RecieveOutput } from "../../dto/receive.dto";

export class GetReceiveUseCase implements IGetReceiveUseCaseEntity {
   constructor(
      private receiveRepository: IReceiveRepository
   ) { }
   async execute(search: string, page: number): Promise<commonOutput<{ data: RecieveOutput[], totalPage: number }> | commonOutput> {
      const { data, totalPage } = await this.receiveRepository.getReceive(search, page)
      if (!data) {
         return ResponseHelper.badRequest(ReceiveFailedMessage.FETCH)
      }
      return ResponseHelper.success(ReceiveSuccessMessage.FETCH, { data, totalPage })
   }
}