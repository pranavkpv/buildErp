import { IMaterialRepository } from "../../../Entities/repositoryEntities/Material-management/IMaterialRepository";
import { IFetchUnitRateUseCase } from "../../../Entities/useCaseEntities/AdminUseCaseEntities/MaterialUseCaseEntities/FetchUnitRateEntity";
import { IMaterialModelEntity } from "../../../Entities/ModelEntities/Material.Entity";
import { ResponseHelper } from "../../../Shared/utils/response";
import { HTTP_STATUS } from "../../../Shared/Status_code";
import { commonOutput } from "../../../Entities/Input-OutputEntities/CommonEntities/common";


export class FetchUnitRateUseCase implements IFetchUnitRateUseCase {
   private materialRepository: IMaterialRepository
   constructor(materialRepository: IMaterialRepository) {
      this.materialRepository = materialRepository
   }
   async execute(material_name: string, brand_name: string, unit_name: string): Promise<IMaterialModelEntity | null | commonOutput> {
      try {
         const existMaterial = await this.materialRepository.findUnitRate(material_name, brand_name, unit_name)
         return existMaterial
      } catch (error: any) {
         return ResponseHelper.failure(error.message, HTTP_STATUS.INTERNAL_SERVER_ERROR)
      }
   }
}