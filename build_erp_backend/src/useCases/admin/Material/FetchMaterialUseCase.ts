import { commonOutput } from "../../../Entities/Input-OutputEntities/CommonEntities/common";
import { materialOutput } from "../../../Entities/Input-OutputEntities/MaterialEntities/material";
import { IMaterialRepository } from "../../../Entities/repositoryEntities/Material-management/IMaterialRepository";
import { IFetchMaterialUseCase } from "../../../Entities/useCaseEntities/AdminUseCaseEntities/MaterialUseCaseEntities/FetchMaterialEntity";
import { SUCCESS_MESSAGE } from "../../../Shared/Message";
import { HTTP_STATUS } from "../../../Shared/Status_code";
import { ResponseHelper } from "../../../Shared/utils/response";

export class FetchMaterialUseCase implements IFetchMaterialUseCase {
   private materialRepository: IMaterialRepository
   constructor(materialRepository: IMaterialRepository) {
      this.materialRepository = materialRepository
   }
   async execute(): Promise<materialOutput | commonOutput> {
      try {
         const data = await this.materialRepository.findAllUniqueMaterial()
         return {
            success:true,
            message:SUCCESS_MESSAGE.MATERIAL.UNIQUE_MATERIAL_FETCH,
            status_code:HTTP_STATUS.OK,
            data
         }
      } catch (error: any) {
         return ResponseHelper.failure(error.message, HTTP_STATUS.INTERNAL_SERVER_ERROR)
      }
   }
}