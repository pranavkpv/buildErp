import { commonOutput } from "../../dto/CommonEntities/common";
import { materialOutput } from "../../dto/MaterialEntities/material";
import { IMaterialRepositoryEntity } from "../../../domain/interfaces/Material-management/IMaterialRepository";
import { IFetchMaterialUseCaseEntity } from "../../interfaces/AdminUseCaseEntities/MaterialUseCaseEntities/FetchMaterialEntity";
import { ResponseHelper } from "../../../Shared/responseHelpers/response";
import { MaterialSuccessMessage } from "../../../Shared/Messages/Material.Message";

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