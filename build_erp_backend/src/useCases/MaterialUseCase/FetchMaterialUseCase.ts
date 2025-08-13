import { commonOutput } from "../../DTO/CommonEntities/common";
import { materialOutput } from "../../DTO/MaterialEntities/material";
import { IMaterialRepositoryEntity } from "../../Entities/repositoryEntities/Material-management/IMaterialRepository";
import { IFetchMaterialUseCaseEntity } from "../../Entities/useCaseEntities/AdminUseCaseEntities/MaterialUseCaseEntities/FetchMaterialEntity";
import { ResponseHelper } from "../../Shared/ResponseHelper/response";
import { MaterialSuccessMessage } from "../../Shared/Messages/Material.Message";

export class FetchMaterialUseCase implements IFetchMaterialUseCaseEntity {
   private materialRepository: IMaterialRepositoryEntity
   constructor(materialRepository: IMaterialRepositoryEntity) {
      this.materialRepository = materialRepository
   }
   async execute(): Promise<materialOutput | commonOutput> {
      const data = await this.materialRepository.findAllUniqueMaterial()
      return ResponseHelper.success(MaterialSuccessMessage.UNIQUE_MATERIAL_FETCH, data)
   }
}