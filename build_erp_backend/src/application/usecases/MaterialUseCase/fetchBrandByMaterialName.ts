import { IFetchBrandByMaterialNameUsecase } from "../../interfaces/AdminUseCaseEntities/MaterialUseCaseEntities/FetchBrandByMaterialNameEntity";
import { ResponseHelper } from "../../../Shared/responseHelpers/response";
import { MaterialSuccessMessage } from "../../../Shared/Messages/Material.Message";
import { commonOutput } from "../../dto/common";
import { IMaterialRepository } from "../../../domain/interfaces/Material-management/IMaterialRepository";

export class FetchBrandByMaterialNameUsecase implements IFetchBrandByMaterialNameUsecase {
   constructor(
      private _materialRepository: IMaterialRepository
   ) { }
   async execute(material_name: string): Promise<commonOutput<string[]>> {
      const result = await this._materialRepository.findBrandByMaterialName(material_name)
      return ResponseHelper.success(MaterialSuccessMessage.FETCH_BRAND_BY_MATERIAL_NAME, result)
   }
}