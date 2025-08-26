import { IApproveTransferUseCase } from "../../IUseCases/ITransfer/IApproveTransfer";
import { ResponseHelper } from "../../../Shared/responseHelpers/response";
import { TransferFailedMessage, TransferSuccessMessage } from "../../../Shared/Messages/Transfer.Message";
import { ITransferRepository } from "../../../domain/Entities/IRepository/ITransfer";
import { IProjectStockRepository } from "../../../domain/Entities/IRepository/IProjectStock";
import { IMaterialRepository } from "../../../domain/Entities/IRepository/IMaterial";
import { IprojectRepository } from "../../../domain/Entities/IRepository/IProject";
import { transferInput } from "../../Entities/transfer.entity";
import { commonOutput } from "../../dto/common";

export class ApproveTransferUseCase implements IApproveTransferUseCase {
   constructor(
      private _transferRepository: ITransferRepository,
      private _projectStockRepository: IProjectStockRepository,
      private _materialRepository: IMaterialRepository,
      private _projectRepository: IprojectRepository
   ) { }
   async execute(input: transferInput): Promise<commonOutput> {
      if (!input._id) return ResponseHelper.badRequest(TransferFailedMessage.ID_NOT_MATCH)
      for (let element of input.materialDetails) {
         const ToProjectStock = await this._projectStockRepository.getStockQuantityByProjectAndMaterial({ material_id: element.material_id, project_id: input.from_project_id,quantity:0 }) || 0
         const materialData = await this._materialRepository.getMaterialById(element.material_id)
         const projectData = await this._projectRepository.getProjectById(input.from_project_id)
         if (ToProjectStock < element.quantity) {
            return ResponseHelper.conflictData(TransferFailedMessage.STOCK_EXCEED + materialData?.material_name + " and " + projectData?.project_name)
         }
      }
      await this._transferRepository.approveTransfer(input._id)
      for (let char of input.materialDetails) {
         await this._projectStockRepository.decreaseStock({ material_id: char.material_id, project_id: input.from_project_id, quantity: char.quantity })
      }
      return ResponseHelper.success(TransferSuccessMessage.APPROVE)
   }
}
