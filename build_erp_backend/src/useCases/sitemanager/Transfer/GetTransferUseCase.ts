import { commonOutput } from "../../../Entities/Input-OutputEntities/CommonEntities/common";
import { TransferOutput } from "../../../Entities/Input-OutputEntities/PurchaseEntity.ts/Transfer";
import { ITransferRepository } from "../../../Entities/repositoryEntities/Purchase-management/ITransferRepository";
import { IGetTransferUseCase } from "../../../Entities/useCaseEntities/SitemanagerUseCaseEntities/TransferUseCaseEntities/GetTransferUseCaseEntity";
import { SUCCESS_MESSAGE } from "../../../Shared/Message";
import { HTTP_STATUS } from "../../../Shared/Status_code";
import { ResponseHelper } from "../../../Shared/utils/response";

export class GetTransferUseCase implements IGetTransferUseCase {
   private transferRepository: ITransferRepository
   constructor(transferRepository: ITransferRepository) {
      this.transferRepository = transferRepository
   }
   async execute(search: string, page: number, id: string): Promise<TransferOutput | commonOutput> {
      try {
         const { data, totalPage } = await this.transferRepository.fetchTransferList(search, page, id)
         return {
            success: true,
            message: SUCCESS_MESSAGE.TRANSFER.FETCH,
            status_code: HTTP_STATUS.OK,
            data,
            totalPage
         }
      } catch (error:any) {
         return ResponseHelper.failure(error.message, HTTP_STATUS.INTERNAL_SERVER_ERROR)
      }
   }
}