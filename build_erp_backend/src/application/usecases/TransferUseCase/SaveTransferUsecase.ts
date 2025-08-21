import { ISaveTransferUseCaseEntity } from "../../interfaces/SitemanagerUseCaseEntities/TransferUseCaseEntities/SaveTransferUseCaseEntity";
import { ResponseHelper } from "../../../Shared/responseHelpers/response";
import { TransferFailedMessage, TransferSuccessMessage } from "../../../Shared/Messages/Transfer.Message";
import { IprojectRepository } from "../../../domain/interfaces/Project-management/IProjectRepository";
import { ITransferRepository } from "../../../domain/interfaces/Purchase-management/ITransferRepository";
import { IProjectStockRepository } from "../../../domain/interfaces/Stock-management/IProjectStockRepository";
import { IMaterialRepository } from "../../../domain/interfaces/Material-management/IMaterialRepository";
import { transferInput } from "../../entities/transfer.entity";
import { commonOutput } from "../../dto/common";

export class SaveTransferUsecase implements ISaveTransferUseCaseEntity {
   constructor(
      private transferRepository: ITransferRepository,
      private projectStockRepository: IProjectStockRepository,
      private materialRepository: IMaterialRepository,
      private projectRepository: IprojectRepository
   ) { }
   async execute(input: transferInput): Promise<commonOutput> {
      const duplicateTransfer = await this.transferRepository.findTransferBytransferId(input.transfer_id)
      if (duplicateTransfer) {
         return ResponseHelper.conflictData(TransferFailedMessage.EXIST_TRANSFER)
      }
      for (let element of input.materialDetails) {
         const ToProjectStock = await this.projectStockRepository.findProjectStockByProjectAndMaterialId({ material_id: element.material_id, project_id: input.from_project_id,quantity:0 }) || 0
         const materialData = await this.materialRepository.findMaterialById(element.material_id)
         const projectData = await this.projectRepository.findProjectById(input.from_project_id)
         if (ToProjectStock < element.quantity) {
            return ResponseHelper.badRequest(TransferFailedMessage.STOCK_EXCEED + materialData?.material_name + " and " + projectData?.project_name)
         }
      }
      const response = await this.transferRepository.saveTransfer(input)
      if (!response) {
         return ResponseHelper.badRequest(TransferFailedMessage.SAVE)
      }
      return ResponseHelper.createdSuccess(TransferSuccessMessage.SAVE)
   }
}