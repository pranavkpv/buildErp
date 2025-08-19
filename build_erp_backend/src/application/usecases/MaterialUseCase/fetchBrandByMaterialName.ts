import { commonOutput } from "../../dto/CommonEntities/common";
import { materialOutput } from "../../dto/MaterialEntities/material";
import { IFetchBrandByMaterialNameEntity } from "../../interfaces/AdminUseCaseEntities/MaterialUseCaseEntities/FetchBrandByMaterialNameEntity";
import { ResponseHelper } from "../../../Shared/responseHelpers/response";
import { IMaterialRepositoryEntity } from "../../../domain/interfaces/Material-management/IMaterialRepository";
import { MaterialSuccessMessage } from "../../../Shared/Messages/Material.Message";

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