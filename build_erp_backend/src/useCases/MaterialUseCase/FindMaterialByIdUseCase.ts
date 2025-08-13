import { commonOutput } from "../../DTO/CommonEntities/common";
import { materialOutput } from "../../DTO/MaterialEntities/material";
import { IMaterialRepositoryEntity } from "../../Entities/repositoryEntities/Material-management/IMaterialRepository";
import { IFindMaterialByIdUsecaseEntity } from "../../Entities/useCaseEntities/AdminUseCaseEntities/MaterialUseCaseEntities/FindMaterialByIdEntity";
import { ResponseHelper } from "../../Shared/ResponseHelper/response";
import { MaterialSuccessMessage } from "../../Shared/Messages/Material.Message";

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