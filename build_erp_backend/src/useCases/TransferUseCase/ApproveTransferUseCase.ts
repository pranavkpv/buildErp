import { commonOutput } from "../../DTO/CommonEntities/common";
import { transferInput } from "../../DTO/PurchaseEntity.ts/Transfer";
import { IApproveTransferUseCaseEntity } from "../../Entities/useCaseEntities/SitemanagerUseCaseEntities/TransferUseCaseEntities/ApproveTransferUseCaseEntity";
import { ResponseHelper } from "../../Shared/ResponseHelper/response";
import { ITransferRepositoryEntity } from "../../Entities/repositoryEntities/Purchase-management/ITransferRepository";
import { IProjectStockRepositoryEntity } from "../../Entities/repositoryEntities/Stock-management/IProjectStockRepository";
import { IMaterialRepositoryEntity } from "../../Entities/repositoryEntities/Material-management/IMaterialRepository";
import { IprojectRepositoryEntity } from "../../Entities/repositoryEntities/Project-management/IProjectRepository";
import { TransferFailedMessage, TransferSuccessMessage } from "../../Shared/Messages/Transfer.Message";

export class ApproveTransferUseCase implements IApproveTransferUseCaseEntity {
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
      if (!input._id) return ResponseHelper.badRequest(TransferFailedMessage.ID_NOT_MATCH)
      for (let element of input.materialDetails) {
         const ToProjectStock = await this.projectStockRepository.findProjectStockByProjectAndMaterialId({ material_id: element.material_id, project_id: input.from_project_id }) || 0
         const materialData = await this.materialRepository.findMaterialById(element.material_id)
         const projectData = await this.projectRepository.findProjectById(input.from_project_id)
         if (ToProjectStock < element.quantity) {
            return ResponseHelper.conflictData(TransferFailedMessage.STOCK_EXCEED + materialData?.material_name + " and " + projectData?.project_name)
         }
      }
      await this.transferRepository.approveTransfer(input._id)
      for (let char of input.materialDetails) {
         await this.projectStockRepository.DecrementStockByID({ material_id: char.material_id, project_id: input.from_project_id, quantity: char.quantity })
      }
      return ResponseHelper.success(TransferSuccessMessage.APPROVE)
   }
}
