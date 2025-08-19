import { commonOutput } from "../../dto/CommonEntities/common";
import { materialOutput } from "../../dto/MaterialEntities/material";
import { IMaterialRepositoryEntity } from "../../../domain/interfaces/Material-management/IMaterialRepository";
import { IDisplayAllMaterialUsecaseEntity } from "../../interfaces/AdminUseCaseEntities/MaterialUseCaseEntities/DisplayAllMaterialEntity";
import { MaterialSuccessMessage } from "../../../Shared/Messages/Material.Message";
import { ResponseHelper } from "../../../Shared/responseHelpers/response";


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



