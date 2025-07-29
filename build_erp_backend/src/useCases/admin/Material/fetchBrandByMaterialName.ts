import { commonOutput } from "../../../Entities/Input-OutputEntities/CommonEntities/common";
import { materialOutput } from "../../../Entities/Input-OutputEntities/MaterialEntities/material";
import { IMaterialRepository } from "../../../Entities/repositoryEntities/Material-management/IMaterialRepository";
import { IFetchBrandByMaterialName } from "../../../Entities/useCaseEntities/AdminUseCaseEntities/MaterialUseCaseEntities/FetchBrandByMaterialNameEntity";
import { SUCCESS_MESSAGE } from "../../../Shared/Message";
import { HTTP_STATUS } from "../../../Shared/Status_code";
import { ResponseHelper } from "../../../Shared/utils/response";

export class FetchBrandByMaterialName implements IFetchBrandByMaterialName {
   private materialRepository: IMaterialRepository
   constructor(materialRepository: IMaterialRepository) {
      this.materialRepository = materialRepository
   }
   async execute(material_name: string): Promise<materialOutput | commonOutput> {
      try {
         const result = await this.materialRepository.findBrandByMaterialName(material_name)
         return {
            success:true,
            message:SUCCESS_MESSAGE.BRAND.FETCH_BRAND_BY_MATERIAL_NAME,
            status_code:HTTP_STATUS.OK,
            data:result
         }
      } catch (error: any) {
         return ResponseHelper.failure(error.message, HTTP_STATUS.INTERNAL_SERVER_ERROR)
      }
   }
}