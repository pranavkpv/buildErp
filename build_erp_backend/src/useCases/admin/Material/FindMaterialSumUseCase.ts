import { commonOutput } from "../../../Entities/Input-OutputEntities/CommonEntities/common";
import { specOutput } from "../../../Entities/Input-OutputEntities/EstimationEntities/specification";
import { IMaterialRepository } from "../../../Entities/repositoryEntities/Material-management/IMaterialRepository";
import { IFindmaterialSumUseCase } from "../../../Entities/useCaseEntities/AdminUseCaseEntities/MaterialUseCaseEntities/FindMaterialSumEntity";
import { SUCCESS_MESSAGE } from "../../../Shared/Message";
import { HTTP_STATUS } from "../../../Shared/Status_code";
import { ResponseHelper } from "../../../Shared/utils/response";


export class FindmaterialSumUseCase implements IFindmaterialSumUseCase {
   private materialRepository: IMaterialRepository
   constructor(materialRepository: IMaterialRepository) {
      this.materialRepository = materialRepository
   }
   async execute(materials: { material_id: string, quantity: number }[]): Promise<specOutput | commonOutput> {
      try {
         const sum = await this.materialRepository.findSumOfMaterial(materials)
         return {
            success: true,
            message: SUCCESS_MESSAGE.SPEC.FETCH_MATERIAL_SUM,
            status_code: HTTP_STATUS.OK,
            data: sum
         }
      } catch (error: any) {
         return ResponseHelper.failure(error.message, HTTP_STATUS.INTERNAL_SERVER_ERROR)
      }
   }
}