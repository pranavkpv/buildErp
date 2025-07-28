import { commonOutput } from "../../../Entities/Input-OutputEntities/CommonEntities/common";
import { IMaterialRepository } from "../../../Entities/repositoryEntities/Material-management/IMaterialRepository";
import { IDisplayAllMaterialUsecase } from "../../../Entities/useCaseEntities/AdminUseCaseEntities/MaterialUseCaseEntities/DisplayAllMaterialEntity";
import { HTTP_STATUS } from "../../../Shared/Status_code";
import { ResponseHelper } from "../../../Shared/utils/response";




export class DisplayAllMaterialUseCase implements IDisplayAllMaterialUsecase {
   private materialRepository: IMaterialRepository
   constructor(materialRepository: IMaterialRepository) {
      this.materialRepository = materialRepository
   }
   async execute(page: number, search: string): Promise<{ getMaterialData: any[]; totalPage: number } | commonOutput> {
      try {
         const { getMaterialData, totalPage } = await this.materialRepository.findAllMaterial(page, search)
         return {
            getMaterialData,
            totalPage
         }
      } catch (error: any) {
         return ResponseHelper.failure(error.message, HTTP_STATUS.INTERNAL_SERVER_ERROR)
      }
   }
}



