import { ISpecRepository } from "../../../domain/interfaces/Estimation-management/ISpecRepository"
import { IMaterialRepository } from "../../../domain/interfaces/Material-management/IMaterialRepository"
import { IProjectStockRepository } from "../../../domain/interfaces/Stock-management/IProjectStockRepository"
import { MaterialFailedMessage, MaterialSuccessMessage } from "../../../Shared/Messages/Material.Message"
import { ResponseHelper } from "../../../Shared/responseHelpers/response"
import { commonOutput } from "../../dto/common"
import { IDeleteMaterialUseCase } from "../../interfaces/AdminUseCaseEntities/MaterialUseCaseEntities/DeleteMaterialEntity"


export class DeleteMaterialUseCase implements IDeleteMaterialUseCase {
   constructor(
      private _materialRepository: IMaterialRepository,
      private _projectStockRepository: IProjectStockRepository,
      private _specRepository: ISpecRepository
   ) { }
   async execute(_id: string): Promise<commonOutput> {
      const material_id = _id
      const existEstimation = await this._specRepository.findSpecByMaterialId(_id)
      if (existEstimation) {
         return ResponseHelper.conflictData(MaterialFailedMessage.USED_SPEC)
      }
      await this._materialRepository.deleteMaterialById(_id)
      await this._projectStockRepository.deleteProjectStockByMaterialId(material_id)
      return ResponseHelper.success(MaterialSuccessMessage.DELETE)
   }
}