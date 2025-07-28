
import { IBrandRepository } from "../../../Entities/repositoryEntities/Material-management/IBrandRepository"
import { ICategoryRepository } from "../../../Entities/repositoryEntities/Material-management/ICategoryRepository"
import { IMaterialRepository } from "../../../Entities/repositoryEntities/Material-management/IMaterialRepository"
import { IUnitRepository } from "../../../Entities/repositoryEntities/Material-management/IUnitRepository"
import { getAddMaterialData } from "../../../Entities/Input-OutputEntities/MaterialEntities/material"
import { IDisplayAddMaterialUseCase } from "../../../Entities/useCaseEntities/AdminUseCaseEntities/MaterialUseCaseEntities/DisplayAddMaterialEntity"
import { commonOutput } from "../../../Entities/Input-OutputEntities/CommonEntities/common"
import { ResponseHelper } from "../../../Shared/utils/response"
import { HTTP_STATUS } from "../../../Shared/Status_code"




export class DisplayAddMaterialDataUseCase implements IDisplayAddMaterialUseCase {
   private materialRepository: IMaterialRepository
   private categoryRepository: ICategoryRepository
   private brandRepository: IBrandRepository
   private unitRepository: IUnitRepository
   constructor(materialRepository: IMaterialRepository, categoryRepository: ICategoryRepository, brandRepository: IBrandRepository, unitRepository: IUnitRepository) {
      this.materialRepository = materialRepository
      this.categoryRepository = categoryRepository
      this.brandRepository = brandRepository
      this.unitRepository = unitRepository
   }
   async execute(): Promise<getAddMaterialData | commonOutput> {
      try {
         const categoryData = await this.categoryRepository.findAllCategory()
         const brandData = await this.brandRepository.findAllBrand()
         const unitData = await this.unitRepository.findUnit()
         const projectData = await this.materialRepository.findAllProject()
         return { categoryData, brandData, unitData, projectData }
      } catch (error: any) {
         return ResponseHelper.failure(error.message, HTTP_STATUS.INTERNAL_SERVER_ERROR)
      }
   }

}

