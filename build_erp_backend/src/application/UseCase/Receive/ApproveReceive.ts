import { IApproveReceiveUseCase } from "../../IUseCases/IReceive/IApproveReceive";
import { ResponseHelper } from "../../../Shared/responseHelpers/response";
import { ReceiveSuccessMessage } from "../../../Shared/Messages/Receive.Message";
import { IProjectStockRepository } from "../../../domain/Entities/IRepository/IProjectStock";
import { IReceiveRepository } from "../../../domain/Entities/IRepository/IReceive";
import { materialData } from "../../../domain/Entities/modelEntities/transfer.entity";
import { commonOutput } from "../../dto/common";

export class ApproveReceiveUseCase implements IApproveReceiveUseCase {
   constructor(
      private _receiveRepository: IReceiveRepository,
      private _projectStockRepository: IProjectStockRepository
   ) { }
   async execute(_id: string, project_id: string, materialDetails: materialData[]): Promise<commonOutput> {
      for (let item of materialDetails) {
         await this._projectStockRepository.increaseStock({ material_id: item.material_id, project_id, quantity: item.quantity })
      }
      await this._receiveRepository.approveReceiveById(_id)
      return ResponseHelper.success(ReceiveSuccessMessage.APPROVE)
   }
}