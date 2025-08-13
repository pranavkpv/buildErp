import { commonOutput } from "../../DTO/CommonEntities/common";
import { materialOutput } from "../../DTO/MaterialEntities/material";
import { IMaterialRepositoryEntity } from "../../Entities/repositoryEntities/Material-management/IMaterialRepository";
import { IDisplayAllMaterialUsecaseEntity } from "../../Entities/useCaseEntities/AdminUseCaseEntities/MaterialUseCaseEntities/DisplayAllMaterialEntity";
import { MaterialSuccessMessage } from "../../Shared/Messages/Material.Message";
import { ResponseHelper } from "../../Shared/ResponseHelper/response";


export class DisplayAllMaterialUseCase implements IDisplayAllMaterialUsecaseEntity {
   private materialRepository: IMaterialRepositoryEntity
   constructor(materialRepository: IMaterialRepositoryEntity) {
      this.materialRepository = materialRepository
   }
   async execute(page: number, search: string): Promise<materialOutput | commonOutput> {
      const { data, totalPage } = await this.materialRepository.findAllMaterial({ page, search })
      return ResponseHelper.success(MaterialSuccessMessage.FETCH, data, totalPage)
   }
}



