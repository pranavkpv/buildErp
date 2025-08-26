import { ISpecRepository } from "../../../domain/Entities/IRepository/ISpecification"
import { IMaterialRepository } from "../../../domain/Entities/IRepository/IMaterial"
import { IProjectStockRepository } from "../../../domain/Entities/IRepository/IProjectStock"
import { MaterialFailedMessage, MaterialSuccessMessage } from "../../../Shared/Messages/Material.Message"
import { ResponseHelper } from "../../../Shared/responseHelpers/response"
import { commonOutput } from "../../dto/common"
import { IDeleteMaterialUseCase } from "../../IUseCases/IMaterial/IDeleteMaterial"


export class DeleteMaterialUseCase implements IDeleteMaterialUseCase {
   constructor(
      private _materialRepository: IMaterialRepository,
      private _projectStockRepository: IProjectStockRepository,
      private _specRepository: ISpecRepository
   ) { }
   async execute(_id: string): Promise<commonOutput> {
      const material_id = _id
      const existEstimation = await this._specRepository.getSpecByMaterialId(_id)
      if (existEstimation) {
         return ResponseHelper.conflictData(MaterialFailedMessage.USED_SPEC)
      }
      await this._materialRepository.deleteMaterial(_id)
      await this._projectStockRepository.deleteProjectStockByMaterialId(material_id)
      return ResponseHelper.success(MaterialSuccessMessage.DELETE)
   }
}