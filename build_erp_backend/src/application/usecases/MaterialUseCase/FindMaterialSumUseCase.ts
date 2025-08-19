import { IMaterialRepository } from "../../../domain/interfaces/Material-management/IMaterialRepository";
import { IFindmaterialSumUseCase } from "../../interfaces/AdminUseCaseEntities/MaterialUseCaseEntities/FindMaterialSumEntity";
import { ResponseHelper } from "../../../Shared/responseHelpers/response";
import { MaterialSuccessMessage } from "../../../Shared/Messages/Material.Message";
import { commonOutput } from "../../dto/common";
import { materialSumInput } from "../../entities/material.entity";

export class FindmaterialSumUseCase implements IFindmaterialSumUseCase {
   constructor(
      private _materialRepository: IMaterialRepository
   ) {
   }
   async execute(input:materialSumInput[]): Promise<commonOutput<number> | commonOutput> {
      const sum = await this._materialRepository.findSumOfMaterial(input)
      return ResponseHelper.success(MaterialSuccessMessage.FETCH_MATERIAL_SUM, sum)
   }
}