import { commonOutput } from "../../../Entities/Input-OutputEntities/CommonEntities/common";
import { IMaterialRepository } from "../../../Entities/repositoryEntities/Material-management/IMaterialRepository";
import { IFetchMaterialUseCase } from "../../../Entities/useCaseEntities/AdminUseCaseEntities/MaterialUseCaseEntities/FetchMaterialEntity";
import { HTTP_STATUS } from "../../../Shared/Status_code";
import { ResponseHelper } from "../../../Shared/utils/response";

export class FetchMaterialUseCase implements IFetchMaterialUseCase {
   private materialRepository: IMaterialRepository
   constructor(materialRepository: IMaterialRepository) {
      this.materialRepository = materialRepository
   }
   async execute(): Promise<string[] | commonOutput> {
      try {
         const data = await this.materialRepository.findAllUniqueMaterial()
         return data
      } catch (error: any) {
         return ResponseHelper.failure(error.message, HTTP_STATUS.INTERNAL_SERVER_ERROR)
      }
   }
}