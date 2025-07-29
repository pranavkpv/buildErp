
import { IBrandRepository } from "../../../Entities/repositoryEntities/Material-management/IBrandRepository"
import { ICategoryRepository } from "../../../Entities/repositoryEntities/Material-management/ICategoryRepository"
import { IMaterialRepository } from "../../../Entities/repositoryEntities/Material-management/IMaterialRepository"
import { IUnitRepository } from "../../../Entities/repositoryEntities/Material-management/IUnitRepository"
import { getAddMaterialData, materialOutput } from "../../../Entities/Input-OutputEntities/MaterialEntities/material"
import { IDisplayAddMaterialUseCase } from "../../../Entities/useCaseEntities/AdminUseCaseEntities/MaterialUseCaseEntities/DisplayAddMaterialEntity"
import { commonOutput } from "../../../Entities/Input-OutputEntities/CommonEntities/common"
import { ResponseHelper } from "../../../Shared/utils/response"
import { HTTP_STATUS } from "../../../Shared/Status_code"
import { SUCCESS_MESSAGE } from "../../../Shared/Message"




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
   async execute(): Promise<materialOutput | commonOutput> {
      try {
         const categoryData = await this.categoryRepository.findAllCategory()
         const brandData = await this.brandRepository.findAllBrand()
         const unitData = await this.unitRepository.findUnit()
         const projectData = await this.materialRepository.findAllProject()
         return {
            success:true,
            message:SUCCESS_MESSAGE.MATERIAL.ADDFETCH,
            status_code:HTTP_STATUS.OK,
            data:{ categoryData, brandData, unitData, projectData }
         }
      } catch (error: any) {
         return ResponseHelper.failure(error.message, HTTP_STATUS.INTERNAL_SERVER_ERROR)
      }
   }

}

