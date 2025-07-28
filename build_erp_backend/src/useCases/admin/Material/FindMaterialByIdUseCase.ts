import { commonOutput } from "../../../Entities/Input-OutputEntities/CommonEntities/common";
import { IMaterialModelEntity } from "../../../Entities/ModelEntities/Material.Entity";
import { IMaterialRepository } from "../../../Entities/repositoryEntities/Material-management/IMaterialRepository";
import { IFindMaterialByIdUsecase } from "../../../Entities/useCaseEntities/AdminUseCaseEntities/MaterialUseCaseEntities/FindMaterialByIdEntity";
import { HTTP_STATUS } from "../../../Shared/Status_code";
import { ResponseHelper } from "../../../Shared/utils/response";

export class FindMaterialByIdUseCase implements IFindMaterialByIdUsecase {
   private materialRepository: IMaterialRepository
   constructor(materialRepository: IMaterialRepository) {
      this.materialRepository = materialRepository
   }
   async execute(_id: string): Promise<IMaterialModelEntity | null | commonOutput> {
     try {
       const materialList = await this.materialRepository.findMaterialById(_id)
      return materialList ? materialList : null
     } catch (error:any) {
      return ResponseHelper.failure(error.message, HTTP_STATUS.INTERNAL_SERVER_ERROR)
     }
   }
}