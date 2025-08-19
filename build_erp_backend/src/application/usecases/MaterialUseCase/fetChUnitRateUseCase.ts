import { IMaterialRepositoryEntity } from "../../../domain/interfaces/Material-management/IMaterialRepository";
import { IFetchUnitRateUseCaseEntity } from "../../interfaces/AdminUseCaseEntities/MaterialUseCaseEntities/FetchUnitRateEntity";
import { commonOutput } from "../../dto/CommonEntities/common";
import { materialOutput } from "../../dto/MaterialEntities/material";
import { ResponseHelper } from "../../../Shared/responseHelpers/response";
import { MaterialSuccessMessage } from "../../../Shared/Messages/Material.Message";


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