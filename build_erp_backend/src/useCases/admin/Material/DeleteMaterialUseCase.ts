import { IEstimationRepository } from "../../../Entities/repositoryEntities/Estimation-management/IEstimationRepository"
import { IMaterialRepository } from "../../../Entities/repositoryEntities/Material-management/IMaterialRepository"
import { IProjectStockRepository } from "../../../Entities/repositoryEntities/Stock-management/IProjectStockRepository"
import { ISpecRepository } from "../../../Entities/repositoryEntities/Estimation-management/ISpecRepository"
import { commonOutput } from "../../../Entities/Input-OutputEntities/CommonEntities/common"
import { IDeleteMaterialUseCase } from "../../../Entities/useCaseEntities/AdminUseCaseEntities/MaterialUseCaseEntities/DeleteMaterialEntity"
import { ResponseHelper } from "../../../Shared/utils/response"
import { ERROR_MESSAGE, SUCCESS_MESSAGE } from "../../../Shared/Message"
import { HTTP_STATUS } from "../../../Shared/Status_code"



export class DeleteMaterialUseCase implements IDeleteMaterialUseCase {
   private materialRepository: IMaterialRepository
   private projectStockRepository: IProjectStockRepository
   private specRepository : ISpecRepository
   constructor(materialRepository: IMaterialRepository, projectStockRepository: IProjectStockRepository,specRepository : ISpecRepository) {
      this.materialRepository = materialRepository
      this.projectStockRepository = projectStockRepository
      this.specRepository = specRepository
   }
   async execute(_id:string): Promise<commonOutput> {
      const material_id = _id
      const existEstimation = await this.specRepository.findSpecByMaterialId(_id)
      if(existEstimation){
         return ResponseHelper.failure(ERROR_MESSAGE.MATERIAL.USED_SPEC,HTTP_STATUS.CONFLICT)
      }
      await this.materialRepository.deleteMaterialById(_id)
      await this.projectStockRepository.deleteProjectStockByMaterialId(material_id)
      return ResponseHelper.success(SUCCESS_MESSAGE.MATERIAL.DELETE,HTTP_STATUS.OK)
   }
}