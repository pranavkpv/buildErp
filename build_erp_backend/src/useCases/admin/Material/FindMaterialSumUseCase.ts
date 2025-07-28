import { commonOutput } from "../../../Entities/Input-OutputEntities/CommonEntities/common";
import { IMaterialRepository } from "../../../Entities/repositoryEntities/Material-management/IMaterialRepository";
import { IFindmaterialSumUseCase } from "../../../Entities/useCaseEntities/AdminUseCaseEntities/MaterialUseCaseEntities/FindMaterialSumEntity";
import { HTTP_STATUS } from "../../../Shared/Status_code";
import { ResponseHelper } from "../../../Shared/utils/response";


export class FindmaterialSumUseCase implements IFindmaterialSumUseCase {
   private materialRepository: IMaterialRepository
   constructor(materialRepository: IMaterialRepository) {
      this.materialRepository = materialRepository
   }
   async execute(materials: { material_id: string, quantity: number }[]): Promise<number | commonOutput> {
      try {
         const sum = await this.materialRepository.findSumOfMaterial(materials)
         return sum
      } catch (error:any) {
         return ResponseHelper.failure(error.message, HTTP_STATUS.INTERNAL_SERVER_ERROR)
      }
   }
}