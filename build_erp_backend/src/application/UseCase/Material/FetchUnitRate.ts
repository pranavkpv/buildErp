import { ResponseHelper } from "../../../Shared/responseHelpers/response";
import { MaterialSuccessMessage } from "../../../Shared/Messages/Material.Message";
import { IFetchUnitRateUseCase } from "../../IUseCases/IMaterial/IFetchUnitRate";
import { IMaterialRepository } from "../../../domain/Entities/IRepository/IMaterial";
import { commonOutput } from "../../dto/common";
import { fetchUnitRateInput } from "../../Entities/material.entity";


export class FetchUnitRateUseCase implements IFetchUnitRateUseCase {
   constructor(
      private _materialRepository: IMaterialRepository
   ) { }
   async execute(input:fetchUnitRateInput): Promise<commonOutput<number> | void> {
      const existMaterial = await this._materialRepository.getUnitRate(input)
      if(!existMaterial) return
      return ResponseHelper.success(MaterialSuccessMessage.FETCHUNITRATE, existMaterial.unit_rate)
   }
}