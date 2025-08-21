import { ResponseHelper } from "../../../Shared/responseHelpers/response";
import { MaterialSuccessMessage } from "../../../Shared/Messages/Material.Message";
import { IFetchUnitRateUseCase } from "../../interfaces/AdminUseCaseEntities/MaterialUseCaseEntities/FetchUnitRateEntity";
import { IMaterialRepository } from "../../../domain/interfaces/Material-management/IMaterialRepository";
import { commonOutput } from "../../dto/common";
import { fetchUnitRateInput } from "../../entities/material.entity";


export class FetchUnitRateUseCase implements IFetchUnitRateUseCase {
   constructor(
      private materialRepository: IMaterialRepository
   ) { }
   async execute(input:fetchUnitRateInput): Promise<commonOutput<number> | void> {
      const existMaterial = await this.materialRepository.findUnitRate(input)
      if(!existMaterial) return
      return ResponseHelper.success(MaterialSuccessMessage.FETCHUNITRATE, existMaterial.unit_rate)
   }
}