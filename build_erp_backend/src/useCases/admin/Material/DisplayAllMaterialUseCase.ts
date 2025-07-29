import { commonOutput } from "../../../Entities/Input-OutputEntities/CommonEntities/common";
import { materialOutput } from "../../../Entities/Input-OutputEntities/MaterialEntities/material";
import { IMaterialRepository } from "../../../Entities/repositoryEntities/Material-management/IMaterialRepository";
import { IDisplayAllMaterialUsecase } from "../../../Entities/useCaseEntities/AdminUseCaseEntities/MaterialUseCaseEntities/DisplayAllMaterialEntity";
import { SUCCESS_MESSAGE } from "../../../Shared/Message";
import { HTTP_STATUS } from "../../../Shared/Status_code";
import { ResponseHelper } from "../../../Shared/utils/response";




export class DisplayAllMaterialUseCase implements IDisplayAllMaterialUsecase {
   private materialRepository: IMaterialRepository
   constructor(materialRepository: IMaterialRepository) {
      this.materialRepository = materialRepository
   }
   async execute(page: number, search: string): Promise<materialOutput | commonOutput> {
      try {
         const { data, totalPage } = await this.materialRepository.findAllMaterial(page, search)
         return {
            success:true,
            message:SUCCESS_MESSAGE.MATERIAL.FETCH,
            status_code:HTTP_STATUS.OK,
            data,
            totalPage
         }
      } catch (error: any) {
         return ResponseHelper.failure(error.message, HTTP_STATUS.INTERNAL_SERVER_ERROR)
      }
   }
}



