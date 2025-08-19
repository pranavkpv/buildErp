import { commonOutput } from "../../dto/CommonEntities/common";
import { materialOutput } from "../../dto/MaterialEntities/material";
import { IMaterialRepositoryEntity } from "../../../domain/interfaces/Material-management/IMaterialRepository";
import { IFindMaterialByIdUsecaseEntity } from "../../interfaces/AdminUseCaseEntities/MaterialUseCaseEntities/FindMaterialByIdEntity";
import { ResponseHelper } from "../../../Shared/responseHelpers/response";
import { MaterialSuccessMessage } from "../../../Shared/Messages/Material.Message";

export class FindMaterialByIdUseCase implements IFindMaterialByIdUsecaseEntity {
   private materialRepository: IMaterialRepositoryEntity
   constructor(materialRepository: IMaterialRepositoryEntity) {
      this.materialRepository = materialRepository
   }
   async execute(_id: string): Promise<materialOutput | commonOutput> {
      const materialList = await this.materialRepository.findMaterialById(_id)
      return ResponseHelper.success(MaterialSuccessMessage.FETCH, materialList)
   }
}