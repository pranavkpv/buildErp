import { IBrandRepositoryEntity } from "../../../domain/interfaces/Material-management/IBrandRepository"
import { ICategoryRepositoryEntity } from "../../../domain/interfaces/Material-management/ICategoryRepository"
import { IMaterialRepositoryEntity } from "../../../domain/interfaces/Material-management/IMaterialRepository"
import { IUnitRepositoryEntity } from "../../../domain/interfaces/Material-management/IUnitRepository"
import { materialOutput } from "../../dto/MaterialEntities/material"
import { IDisplayAddMaterialUseCaseEntity } from "../../interfaces/AdminUseCaseEntities/MaterialUseCaseEntities/DisplayAddMaterialEntity"
import { commonOutput } from "../../dto/CommonEntities/common"
import { ResponseHelper } from "../../../Shared/responseHelpers/response"
import { MaterialSuccessMessage } from "../../../Shared/Messages/Material.Message"




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

