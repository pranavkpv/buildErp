import { IMaterialRepository } from "../../../domain/Entities/IRepository/IMaterial";
import { IFindmaterialSumUseCase } from "../../IUseCases/IMaterial/IFindMaterialSum";
import { ResponseHelper } from "../../../Shared/responseHelpers/response";
import { MaterialSuccessMessage } from "../../../Shared/Messages/Material.Message";
import { commonOutput } from "../../dto/common";
import { materialSumInput } from "../../Entities/material.entity";

export class FindmaterialSumUseCase implements IFindmaterialSumUseCase {
   constructor(
      private _materialRepository: IMaterialRepository
   ) {
   }
   async execute(input:materialSumInput[]): Promise<commonOutput<number> | commonOutput> {
      const sum = await this._materialRepository.calculateTotalMaterialCost(input)
      return ResponseHelper.success(MaterialSuccessMessage.FETCH_MATERIAL_SUM, sum)
   }
}