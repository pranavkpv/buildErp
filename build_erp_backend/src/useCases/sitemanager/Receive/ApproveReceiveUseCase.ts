import { commonOutput } from "../../../Entities/Input-OutputEntities/CommonEntities/common";
import { materialData } from "../../../Entities/Input-OutputEntities/PurchaseEntity.ts/Receive";
import { IReceiveRepository } from "../../../Entities/repositoryEntities/Purchase-management/IReceiveRepository";
import { ITransferRepository } from "../../../Entities/repositoryEntities/Purchase-management/ITransferRepository";
import { IProjectStockRepository } from "../../../Entities/repositoryEntities/Stock-management/IProjectStockRepository";
import { IApproveReceiveUseCase } from "../../../Entities/useCaseEntities/SitemanagerUseCaseEntities/ReceiveUseCaseEntities/ApproveReceiveUseCaseEntity";
import { ERROR_MESSAGE, SUCCESS_MESSAGE } from "../../../Shared/Message";
import { HTTP_STATUS } from "../../../Shared/Status_code";
import { ResponseHelper } from "../../../Shared/utils/response";

export class ApproveReceiveUseCase implements IApproveReceiveUseCase {
   private receiveRepository: IReceiveRepository
   private projectStockRepository: IProjectStockRepository
   private transferRepository: ITransferRepository
   constructor(receiveRepository: IReceiveRepository, projectStockRepository: IProjectStockRepository,
      transferRepository: ITransferRepository
   ) {
      this.receiveRepository = receiveRepository
      this.projectStockRepository = projectStockRepository
      this.transferRepository = transferRepository
   }
   async execute(_id:string, project_id:string, materialDetails:materialData[]): Promise<commonOutput> {
      try {
         for (let item of materialDetails) {
            await this.projectStockRepository.IncrementStockById(item.material_id, project_id, item.quantity)
         }
         await this.receiveRepository.approveReceive(_id)
         return ResponseHelper.success(SUCCESS_MESSAGE.RECEIVE.APPROVE, HTTP_STATUS.OK)
      } catch (error: any) {
         return ResponseHelper.failure(error.message, HTTP_STATUS.INTERNAL_SERVER_ERROR)
      }
   }
}