import { commonOutput } from "../../DTO/CommonEntities/common";
import { materialOutput } from "../../DTO/MaterialEntities/material";
import { IFetchBrandByMaterialNameEntity } from "../../Entities/useCaseEntities/AdminUseCaseEntities/MaterialUseCaseEntities/FetchBrandByMaterialNameEntity";
import { ResponseHelper } from "../../Shared/ResponseHelper/response";
import { IMaterialRepositoryEntity } from "../../Entities/repositoryEntities/Material-management/IMaterialRepository";
import { MaterialSuccessMessage } from "../../Shared/Messages/Material.Message";

export class FetchBrandByMaterialName implements IFetchBrandByMaterialNameEntity {
   private materialRepository: IMaterialRepositoryEntity
   constructor(materialRepository: IMaterialRepositoryEntity) {
      this.materialRepository = materialRepository
   }
   async execute(material_name: string): Promise<materialOutput | commonOutput> {
         const result = await this.materialRepository.findBrandByMaterialName(material_name)
         return ResponseHelper.success(MaterialSuccessMessage.FETCH_BRAND_BY_MATERIAL_NAME,result)
   }
}