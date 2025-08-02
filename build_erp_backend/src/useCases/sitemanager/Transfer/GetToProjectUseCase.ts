import { commonOutput } from "../../../Entities/Input-OutputEntities/CommonEntities/common";
import { TransferOutput } from "../../../Entities/Input-OutputEntities/PurchaseEntity.ts/Transfer";
import { ITransferRepository } from "../../../Entities/repositoryEntities/Purchase-management/ITransferRepository";
import { IGetToProjectUseCase } from "../../../Entities/useCaseEntities/SitemanagerUseCaseEntities/TransferUseCaseEntities/GetToProjectUseCaseEntity";
import { SUCCESS_MESSAGE } from "../../../Shared/Message";
import { HTTP_STATUS } from "../../../Shared/Status_code";
import { ResponseHelper } from "../../../Shared/utils/response";

export class GetToProjectUseCase implements IGetToProjectUseCase {
   private transferRepository: ITransferRepository
   constructor(transferRepository: ITransferRepository) {
      this.transferRepository = transferRepository
   }
   async execute(projectId: string): Promise<TransferOutput | commonOutput> {
      try {
         const data = await this.transferRepository.fectToproject(projectId)
         return {
            success: true,
            message: SUCCESS_MESSAGE.PROJECT.FETCH,
            status_code: HTTP_STATUS.OK,
            data
         }
      } catch (error: any) {
         return ResponseHelper.failure(error.message, HTTP_STATUS.INTERNAL_SERVER_ERROR)
      }
   }
}