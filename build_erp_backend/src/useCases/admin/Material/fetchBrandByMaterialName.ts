import { commonOutput } from "../../../Entities/Input-OutputEntities/CommonEntities/common";
import { IMaterialRepository } from "../../../Entities/repositoryEntities/Material-management/IMaterialRepository";
import { IFetchBrandByMaterialName } from "../../../Entities/useCaseEntities/AdminUseCaseEntities/MaterialUseCaseEntities/FetchBrandByMaterialNameEntity";
import { HTTP_STATUS } from "../../../Shared/Status_code";
import { ResponseHelper } from "../../../Shared/utils/response";

export class FetchBrandByMaterialName implements IFetchBrandByMaterialName {
   private materialRepository: IMaterialRepository
   constructor(materialRepository: IMaterialRepository) {
      this.materialRepository = materialRepository
   }
   async execute(material_name: string): Promise<string[] | commonOutput> {
      try {
         const result = await this.materialRepository.findBrandByMaterialName(material_name)
         return result
      } catch (error: any) {
         return ResponseHelper.failure(error.message, HTTP_STATUS.INTERNAL_SERVER_ERROR)
      }
   }
}