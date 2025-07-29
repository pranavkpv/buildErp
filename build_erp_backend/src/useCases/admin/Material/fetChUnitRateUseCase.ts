import { IMaterialRepository } from "../../../Entities/repositoryEntities/Material-management/IMaterialRepository";
import { IFetchUnitRateUseCase } from "../../../Entities/useCaseEntities/AdminUseCaseEntities/MaterialUseCaseEntities/FetchUnitRateEntity";
import { IMaterialModelEntity } from "../../../Entities/ModelEntities/Material.Entity";
import { ResponseHelper } from "../../../Shared/utils/response";
import { HTTP_STATUS } from "../../../Shared/Status_code";
import { commonOutput } from "../../../Entities/Input-OutputEntities/CommonEntities/common";
import { materialOutput } from "../../../Entities/Input-OutputEntities/MaterialEntities/material";
import { SUCCESS_MESSAGE } from "../../../Shared/Message";


export class FetchUnitRateUseCase implements IFetchUnitRateUseCase {
   private materialRepository: IMaterialRepository
   constructor(materialRepository: IMaterialRepository) {
      this.materialRepository = materialRepository
   }
   async execute(material_name: string, brand_name: string, unit_name: string): Promise<materialOutput | commonOutput> {
      try {
         const existMaterial = await this.materialRepository.findUnitRate(material_name, brand_name, unit_name)
         return {
            success:true,
            message:SUCCESS_MESSAGE.MATERIAL.FETCHUNITRATE,
            status_code:HTTP_STATUS.OK,
            data:existMaterial
         }
      } catch (error: any) {
         return ResponseHelper.failure(error.message, HTTP_STATUS.INTERNAL_SERVER_ERROR)
      }
   }
}