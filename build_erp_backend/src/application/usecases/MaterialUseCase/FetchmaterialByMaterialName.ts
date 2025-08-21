import { IFetchMaterialByMaterialNameUsecase } from "../../interfaces/AdminUseCaseEntities/MaterialUseCaseEntities/FetchMaterialByMaterialNameEntity";
import { ResponseHelper } from "../../../Shared/responseHelpers/response";
import { IMaterialRepository } from "../../../domain/interfaces/Material-management/IMaterialRepository";
import { MaterialSuccessMessage } from "../../../Shared/Messages/Material.Message";
import { commonOutput } from "../../dto/common";

export class FetchMaterialByMaterialNameUseCasse implements IFetchMaterialByMaterialNameUsecase {
   constructor(
      private _materialRepository: IMaterialRepository
   ) { }
   async execute(material_name: string):Promise<commonOutput<string[]>>  {
      const result = await this._materialRepository.findUnitByMaterialName(material_name)
      return ResponseHelper.success(MaterialSuccessMessage.FETCH, result)
   }
}