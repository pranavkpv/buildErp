import { commonOutput } from "../../DTO/CommonEntities/common";
import { materialOutput } from "../../DTO/MaterialEntities/material";
import { IFetchMaterialByMaterialNameEntity } from "../../Entities/useCaseEntities/AdminUseCaseEntities/MaterialUseCaseEntities/FetchMaterialByMaterialNameEntity";
import { ResponseHelper } from "../../Shared/ResponseHelper/response";
import { IMaterialRepositoryEntity } from "../../Entities/repositoryEntities/Material-management/IMaterialRepository";
import { MaterialSuccessMessage } from "../../Shared/Messages/Material.Message";

export class FetchMaterialByMaterialName implements IFetchMaterialByMaterialNameEntity {
   private materialRepository: IMaterialRepositoryEntity
   constructor(materialRepository: IMaterialRepositoryEntity) {
      this.materialRepository = materialRepository
   }
   async execute(material_name: string): Promise<materialOutput | commonOutput> {
      const result = await this.materialRepository.findUnitByMaterialName(material_name)
      return ResponseHelper.success(MaterialSuccessMessage.FETCH, result)
   }
}