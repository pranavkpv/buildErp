import { IMaterialRepositoryEntity } from "../../Entities/repositoryEntities/Material-management/IMaterialRepository";
import { IFetchUnitRateUseCaseEntity } from "../../Entities/useCaseEntities/AdminUseCaseEntities/MaterialUseCaseEntities/FetchUnitRateEntity";
import { commonOutput } from "../../DTO/CommonEntities/common";
import { materialOutput } from "../../DTO/MaterialEntities/material";
import { ResponseHelper } from "../../Shared/ResponseHelper/response";
import { MaterialSuccessMessage } from "../../Shared/Messages/Material.Message";


export class FetchUnitRateUseCase implements IFetchUnitRateUseCaseEntity {
   private materialRepository: IMaterialRepositoryEntity
   constructor(materialRepository: IMaterialRepositoryEntity) {
      this.materialRepository = materialRepository
   }
   async execute(material_name: string, brand_name: string, unit_name: string): Promise<materialOutput | commonOutput> {
      const existMaterial = await this.materialRepository.findUnitRate({ material_name, brand_name, unit_name })
      return ResponseHelper.success(MaterialSuccessMessage.FETCHUNITRATE, existMaterial)
   }
}