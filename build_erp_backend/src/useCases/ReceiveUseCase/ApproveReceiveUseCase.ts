import { commonOutput } from "../../DTO/CommonEntities/common";
import { materialData } from "../../DTO/PurchaseEntity.ts/Receive";
import { IApproveReceiveUseCaseEntity } from "../../Entities/useCaseEntities/SitemanagerUseCaseEntities/ReceiveUseCaseEntities/ApproveReceiveUseCaseEntity";
import { ResponseHelper } from "../../Shared/ResponseHelper/response";
import { IProjectStockRepositoryEntity } from "../../Entities/repositoryEntities/Stock-management/IProjectStockRepository";
import { IReceiveRepositoryEntity } from "../../Entities/repositoryEntities/Purchase-management/IReceiveRepository";
import { ReceiveSuccessMessage } from "../../Shared/Messages/Receive.Message";

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