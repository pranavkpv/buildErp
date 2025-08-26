import { IFetchMaterialByMaterialNameUsecase } from "../../IUseCases/IMaterial/IFetchUnitByMaterialname";
import { ResponseHelper } from "../../../Shared/responseHelpers/response";
import { IMaterialRepository } from "../../../domain/Entities/IRepository/IMaterial";
import { MaterialSuccessMessage } from "../../../Shared/Messages/Material.Message";
import { commonOutput } from "../../dto/common";

export class FetchMaterialByMaterialNameUseCasse implements IFetchMaterialByMaterialNameUsecase {
   constructor(
      private _materialRepository: IMaterialRepository
   ) { }
   async execute(material_name: string):Promise<commonOutput<string[]>>  {
      const result = await this._materialRepository.getUnitsByMaterialName(material_name)
      return ResponseHelper.success(MaterialSuccessMessage.FETCH, result)
   }
}