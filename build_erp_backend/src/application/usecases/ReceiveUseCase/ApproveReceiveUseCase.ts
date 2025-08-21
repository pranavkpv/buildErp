
import { IApproveReceiveUseCaseEntity } from "../../interfaces/SitemanagerUseCaseEntities/ReceiveUseCaseEntities/ApproveReceiveUseCaseEntity";
import { ResponseHelper } from "../../../Shared/responseHelpers/response";
import { ReceiveSuccessMessage } from "../../../Shared/Messages/Receive.Message";
import { IProjectStockRepository } from "../../../domain/interfaces/Stock-management/IProjectStockRepository";
import { IReceiveRepository } from "../../../domain/interfaces/Purchase-management/IReceiveRepository";
import { materialData } from "../../../domain/Entities/modelEntities/transfer.entity";
import { commonOutput } from "../../dto/common";

export class ApproveReceiveUseCase implements IApproveReceiveUseCaseEntity {

   constructor(
      private receiveRepository: IReceiveRepository,
   private projectStockRepository: IProjectStockRepository
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