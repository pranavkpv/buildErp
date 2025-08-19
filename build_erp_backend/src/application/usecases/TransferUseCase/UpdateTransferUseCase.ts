import { commonOutput } from "../../dto/CommonEntities/common";
import { transferInput } from "../../dto/PurchaseEntity.ts/Transfer";
import { IMaterialRepositoryEntity } from "../../../domain/interfaces/Material-management/IMaterialRepository";
import { IprojectRepositoryEntity } from "../../../domain/interfaces/Project-management/IProjectRepository";
import { ITransferRepositoryEntity } from "../../../domain/interfaces/Purchase-management/ITransferRepository";
import { IProjectStockRepositoryEntity } from "../../../domain/interfaces/Stock-management/IProjectStockRepository";
import { IUpdateTransferUseCaseEntity } from "../../interfaces/SitemanagerUseCaseEntities/TransferUseCaseEntities/UpdateTransferUseCaseEntity";
import { ResponseHelper } from "../../../Shared/responseHelpers/response";
import { TransferFailedMessage, TransferSuccessMessage } from "../../../Shared/Messages/Transfer.Message";

export class UpdateTransferUseCase implements IUpdateTransferUseCaseEntity {
   private transferRepository: ITransferRepositoryEntity
   private projectStockRepository: IProjectStockRepositoryEntity
   private materialRepository: IMaterialRepositoryEntity
   private projectRepository: IprojectRepositoryEntity
   constructor(transferRepository: ITransferRepositoryEntity, projectStockRepository: IProjectStockRepositoryEntity,
      materialRepository: IMaterialRepositoryEntity, projectRepository: IprojectRepositoryEntity
   ) {
      this.transferRepository = transferRepository
      this.projectStockRepository = projectStockRepository
      this.materialRepository = materialRepository
      this.projectRepository = projectRepository
   }
   async execute(input: transferInput): Promise<commonOutput> {
      for (let element of input.materialDetails) {
         const ToProjectStock = await this.projectStockRepository.findProjectStockByProjectAndMaterialId({material_id:element.material_id, project_id:input.from_project_id}) || 0
         const materialData = await this.materialRepository.findMaterialById(element.material_id)
         const projectData = await this.projectRepository.findProjectById(input.from_project_id)
         if (ToProjectStock < element.quantity) {
            return ResponseHelper.badRequest(TransferFailedMessage.STOCK_EXCEED + materialData?.material_name + " and " + projectData?.project_name)
         }
      }
      const response = await this.transferRepository.updateTransfer(input)
      if (!response) {
         return ResponseHelper.badRequest(TransferFailedMessage.UPDATE)
      }
      return ResponseHelper.success(TransferSuccessMessage.UPDATE)
   }
}