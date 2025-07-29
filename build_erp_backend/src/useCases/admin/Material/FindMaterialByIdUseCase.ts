import { commonOutput } from "../../../Entities/Input-OutputEntities/CommonEntities/common";
import { materialOutput } from "../../../Entities/Input-OutputEntities/MaterialEntities/material";
import { IMaterialRepository } from "../../../Entities/repositoryEntities/Material-management/IMaterialRepository";
import { IFindMaterialByIdUsecase } from "../../../Entities/useCaseEntities/AdminUseCaseEntities/MaterialUseCaseEntities/FindMaterialByIdEntity";
import { SUCCESS_MESSAGE } from "../../../Shared/Message";
import { HTTP_STATUS } from "../../../Shared/Status_code";
import { ResponseHelper } from "../../../Shared/utils/response";

export class FindMaterialByIdUseCase implements IFindMaterialByIdUsecase {
   private materialRepository: IMaterialRepository
   constructor(materialRepository: IMaterialRepository) {
      this.materialRepository = materialRepository
   }
   async execute(_id: string): Promise<materialOutput | commonOutput> {
     try {
       const materialList = await this.materialRepository.findMaterialById(_id)
      return {
         success:true,
         message:SUCCESS_MESSAGE.MATERIAL.FETCH,
         status_code:HTTP_STATUS.OK,
         data:materialList 
      }
     } catch (error:any) {
      return ResponseHelper.failure(error.message, HTTP_STATUS.INTERNAL_SERVER_ERROR)
     }
   }
}