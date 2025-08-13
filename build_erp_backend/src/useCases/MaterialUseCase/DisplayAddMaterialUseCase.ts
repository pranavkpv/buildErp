import { IBrandRepositoryEntity } from "../../Entities/repositoryEntities/Material-management/IBrandRepository"
import { ICategoryRepositoryEntity } from "../../Entities/repositoryEntities/Material-management/ICategoryRepository"
import { IMaterialRepositoryEntity } from "../../Entities/repositoryEntities/Material-management/IMaterialRepository"
import { IUnitRepositoryEntity } from "../../Entities/repositoryEntities/Material-management/IUnitRepository"
import { materialOutput } from "../../DTO/MaterialEntities/material"
import { IDisplayAddMaterialUseCaseEntity } from "../../Entities/useCaseEntities/AdminUseCaseEntities/MaterialUseCaseEntities/DisplayAddMaterialEntity"
import { commonOutput } from "../../DTO/CommonEntities/common"
import { ResponseHelper } from "../../Shared/ResponseHelper/response"
import { MaterialSuccessMessage } from "../../Shared/Messages/Material.Message"




export class DisplayAddMaterialDataUseCase implements IDisplayAddMaterialUseCaseEntity {
   private materialRepository: IMaterialRepositoryEntity
   private categoryRepository: ICategoryRepositoryEntity
   private brandRepository: IBrandRepositoryEntity
   private unitRepository: IUnitRepositoryEntity
   constructor(materialRepository: IMaterialRepositoryEntity, categoryRepository: ICategoryRepositoryEntity,
      brandRepository: IBrandRepositoryEntity, unitRepository: IUnitRepositoryEntity) {
      this.materialRepository = materialRepository
      this.categoryRepository = categoryRepository
      this.brandRepository = brandRepository
      this.unitRepository = unitRepository
   }
   async execute(): Promise<materialOutput | commonOutput> {
      const categoryData = await this.categoryRepository.findAllCategory()
      const brandData = await this.brandRepository.findAllBrand()
      const unitData = await this.unitRepository.findUnit()
      const projectData = await this.materialRepository.findAllProject()
      return ResponseHelper.success(MaterialSuccessMessage.ADDFETCH, { categoryData, brandData, unitData, projectData })
   }

}

