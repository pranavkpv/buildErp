import { IMaterialRepository } from "../../../domain/interfaces/Material-management/IMaterialRepository";
import { IFindMaterialByIdUsecase } from "../../interfaces/AdminUseCaseEntities/MaterialUseCaseEntities/FindMaterialByIdEntity";
import { ResponseHelper } from "../../../Shared/responseHelpers/response";
import { MaterialSuccessMessage } from "../../../Shared/Messages/Material.Message";
import { commonOutput } from "../../dto/common";
import { editMaterialFullDatafetch } from "../../entities/material.entity";

export class FindMaterialByIdUseCase implements IFindMaterialByIdUsecase {

   constructor(
      private _materialRepository: IMaterialRepository
   ) { }
   async execute(_id: string): Promise<commonOutput<editMaterialFullDatafetch | null>> {
      const materialList = await this._materialRepository.findMaterialById(_id)
      return ResponseHelper.success(MaterialSuccessMessage.FETCH, materialList)
   }
}