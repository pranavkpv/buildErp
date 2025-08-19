import { commonOutput } from "../../dto/CommonEntities/common";
import { materialData } from "../../dto/PurchaseEntity.ts/Receive";
import { IApproveReceiveUseCaseEntity } from "../../interfaces/SitemanagerUseCaseEntities/ReceiveUseCaseEntities/ApproveReceiveUseCaseEntity";
import { ResponseHelper } from "../../../Shared/responseHelpers/response";
import { IProjectStockRepositoryEntity } from "../../../domain/interfaces/Stock-management/IProjectStockRepository";
import { IReceiveRepositoryEntity } from "../../../domain/interfaces/Purchase-management/IReceiveRepository";
import { ReceiveSuccessMessage } from "../../../Shared/Messages/Receive.Message";

export class ApproveReceiveUseCase implements IApproveReceiveUseCaseEntity {
   private receiveRepository: IReceiveRepositoryEntity
   private projectStockRepository: IProjectStockRepositoryEntity
   constructor(receiveRepository: IReceiveRepositoryEntity, projectStockRepository: IProjectStockRepositoryEntity,

   ) {
      this.receiveRepository = receiveRepository
      this.projectStockRepository = projectStockRepository

   }
   async execute(_id: string, project_id: string, materialDetails: materialData[]): Promise<commonOutput> {
      for (let item of materialDetails) {
         await this.projectStockRepository.IncrementStockById({ material_id: item.material_id, project_id, quantity: item.quantity })
      }
      await this.receiveRepository.approveReceive(_id)
      return ResponseHelper.success(ReceiveSuccessMessage.APPROVE)
   }
}