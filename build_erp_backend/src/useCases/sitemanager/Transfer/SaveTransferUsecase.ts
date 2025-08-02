import { commonOutput } from "../../../Entities/Input-OutputEntities/CommonEntities/common";
import { transferInput } from "../../../Entities/Input-OutputEntities/PurchaseEntity.ts/Transfer";
import { IMaterialRepository } from "../../../Entities/repositoryEntities/Material-management/IMaterialRepository";
import { IprojectRepository } from "../../../Entities/repositoryEntities/Project-management/IProjectRepository";
import { ITransferRepository } from "../../../Entities/repositoryEntities/Purchase-management/ITransferRepository";
import { IProjectStockRepository } from "../../../Entities/repositoryEntities/Stock-management/IProjectStockRepository";
import { ISaveTransferUseCase } from "../../../Entities/useCaseEntities/SitemanagerUseCaseEntities/TransferUseCaseEntities/SaveTransferUseCaseEntity";
import { ERROR_MESSAGE, SUCCESS_MESSAGE } from "../../../Shared/Message";
import { HTTP_STATUS } from "../../../Shared/Status_code";
import { ResponseHelper } from "../../../Shared/utils/response";

export class SaveTransferUsecase implements ISaveTransferUseCase {
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
         const response = await this.transferRepository.saveTransfer(input)
         if (response) {
            return ResponseHelper.success(SUCCESS_MESSAGE.TRANSFER.SAVE, HTTP_STATUS.CREATED)
         } else {
            return ResponseHelper.failure(ERROR_MESSAGE.TRANSFER.ERROR, HTTP_STATUS.BAD_REQUEST)
         }
      } catch (error: any) {
         return ResponseHelper.failure(error.message, HTTP_STATUS.INTERNAL_SERVER_ERROR)
      }
   }
}