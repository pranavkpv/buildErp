import { commonOutput } from "../../../Entities/Input-OutputEntities/CommonEntities/common";
import { transferInput } from "../../../Entities/Input-OutputEntities/PurchaseEntity.ts/Transfer";
import { IProjectStockModelEntity } from "../../../Entities/ModelEntities/ProjectStock.Entity";
import { IMaterialRepository } from "../../../Entities/repositoryEntities/Material-management/IMaterialRepository";
import { IprojectRepository } from "../../../Entities/repositoryEntities/Project-management/IProjectRepository";
import { ITransferRepository } from "../../../Entities/repositoryEntities/Purchase-management/ITransferRepository";
import { IProjectStockRepository } from "../../../Entities/repositoryEntities/Stock-management/IProjectStockRepository";
import { IApproveTransferUseCase } from "../../../Entities/useCaseEntities/SitemanagerUseCaseEntities/TransferUseCaseEntities/ApproveTransferUseCaseEntity";
import { ERROR_MESSAGE, SUCCESS_MESSAGE } from "../../../Shared/Message";
import { HTTP_STATUS } from "../../../Shared/Status_code";
import { ResponseHelper } from "../../../Shared/utils/response";

export class ApproveTransferUseCase implements IApproveTransferUseCase {
   private transferRepository: ITransferRepository
   private projectStockRepository: IProjectStockRepository
   private materialRepository: IMaterialRepository
   private projectRepository: IprojectRepository
   constructor(transferRepository: ITransferRepository, projectStockRepository: IProjectStockRepository,
      materialRepository: IMaterialRepository, projectRepository: IprojectRepository
   ) {
      this.transferRepository = transferRepository
      this.projectStockRepository = projectStockRepository
      this.materialRepository = materialRepository
      this.projectRepository = projectRepository
   }
   async execute(input: transferInput): Promise<commonOutput> {
      try {
         if (!input._id) return ResponseHelper.failure(ERROR_MESSAGE.TRANSFER.ERROR, HTTP_STATUS.BAD_REQUEST)
         const duplicateTransfer = await this.transferRepository.findTransferBytransferId(input.transfer_id)
         if (duplicateTransfer) {
            return ResponseHelper.failure(ERROR_MESSAGE.TRANSFER.EXIST_TRANSFER, HTTP_STATUS.CONFLICT)
         }
         for (let element of input.materialDetails) {
            const ToProjectStock = await this.projectStockRepository.findProjectStockByProjectAndMaterialId(element.material_id, input.from_project_id) || 0
            const materialData = await this.materialRepository.findMaterialById(element.material_id)
            const projectData = await this.projectRepository.findProjectById(input.from_project_id)
            if (ToProjectStock < element.quantity) {
               return ResponseHelper.failure(ERROR_MESSAGE.TRANSFER.STOCK_EXCEED + materialData?.material_name + " and " + projectData?.project_name, HTTP_STATUS.BAD_REQUEST)
            }
         }
         await this.transferRepository.approveTransfer(input._id)
         for (let char of input.materialDetails) {
            await this.projectStockRepository.DecrementStockByID(char.material_id, input.from_project_id, char.quantity)
         }
         return ResponseHelper.success(SUCCESS_MESSAGE.TRANSFER.APPROVE, HTTP_STATUS.OK)
      } catch (error: any) {
         return ResponseHelper.failure(error.message, HTTP_STATUS.INTERNAL_SERVER_ERROR)
      }
   }
}
