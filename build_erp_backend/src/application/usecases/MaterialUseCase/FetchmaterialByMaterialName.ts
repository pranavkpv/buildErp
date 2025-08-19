import { commonOutput } from "../../dto/CommonEntities/common";
import { materialOutput } from "../../dto/MaterialEntities/material";
import { IFetchMaterialByMaterialNameEntity } from "../../interfaces/AdminUseCaseEntities/MaterialUseCaseEntities/FetchMaterialByMaterialNameEntity";
import { ResponseHelper } from "../../../Shared/responseHelpers/response";
import { IMaterialRepositoryEntity } from "../../../domain/interfaces/Material-management/IMaterialRepository";
import { MaterialSuccessMessage } from "../../../Shared/Messages/Material.Message";

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