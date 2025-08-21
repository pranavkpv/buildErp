import { ResponseHelper } from "../../../Shared/responseHelpers/response";
import { MaterialSuccessMessage } from "../../../Shared/Messages/Material.Message";
import { IFetchMaterialUseCase } from "../../interfaces/AdminUseCaseEntities/MaterialUseCaseEntities/FetchMaterialEntity";
import { IMaterialRepository } from "../../../domain/interfaces/Material-management/IMaterialRepository";
import { commonOutput } from "../../dto/common";

export class FetchMaterialUseCase implements IFetchMaterialUseCase {
   constructor(
      private _materialRepository: IMaterialRepository
   ) { }
   async execute(): Promise<commonOutput<string[]>> {
      const data = await this._materialRepository.findAllUniqueMaterial()
      return ResponseHelper.success(MaterialSuccessMessage.UNIQUE_MATERIAL_FETCH, data)
   }
}