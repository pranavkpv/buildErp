import { IApproveTransferUseCaseEntity } from "../../interfaces/SitemanagerUseCaseEntities/TransferUseCaseEntities/ApproveTransferUseCaseEntity";
import { ResponseHelper } from "../../../Shared/responseHelpers/response";
import { TransferFailedMessage, TransferSuccessMessage } from "../../../Shared/Messages/Transfer.Message";
import { ITransferRepository } from "../../../domain/interfaces/Purchase-management/ITransferRepository";
import { IProjectStockRepository } from "../../../domain/interfaces/Stock-management/IProjectStockRepository";
import { IMaterialRepository } from "../../../domain/interfaces/Material-management/IMaterialRepository";
import { IprojectRepository } from "../../../domain/interfaces/Project-management/IProjectRepository";
import { transferInput } from "../../entities/transfer.entity";
import { commonOutput } from "../../dto/common";

export class ApproveTransferUseCase implements IApproveTransferUseCaseEntity {

   constructor(
      private transferRepository: ITransferRepository,
      private projectStockRepository: IProjectStockRepository,
      private materialRepository: IMaterialRepository,
      private projectRepository: IprojectRepository
   ) { }
   async execute(input: transferInput): Promise<commonOutput> {
      if (!input._id) return ResponseHelper.badRequest(TransferFailedMessage.ID_NOT_MATCH)
      for (let element of input.materialDetails) {
         const ToProjectStock = await this.projectStockRepository.findProjectStockByProjectAndMaterialId({ material_id: element.material_id, project_id: input.from_project_id,quantity:0 }) || 0
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
