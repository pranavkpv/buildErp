import { materialOutput, outEditMaterialData } from "../../dto/MaterialEntities/material"
import { IGetEditMaterialUseCaseEntity } from "../../interfaces/AdminUseCaseEntities/MaterialUseCaseEntities/GetEditMaterialEntity"
import { ResponseHelper } from "../../../Shared/responseHelpers/response"
import { commonOutput } from "../../dto/CommonEntities/common"
import { IMaterialRepositoryEntity } from "../../../domain/interfaces/Material-management/IMaterialRepository"
import { ICategoryRepositoryEntity } from "../../../domain/interfaces/Material-management/ICategoryRepository"
import { IBrandRepositoryEntity } from "../../../domain/interfaces/Material-management/IBrandRepository"
import { IUnitRepositoryEntity } from "../../../domain/interfaces/Material-management/IUnitRepository"
import { IProjectStockRepositoryEntity } from "../../../domain/interfaces/Stock-management/IProjectStockRepository"
import { MaterialSuccessMessage } from "../../../Shared/Messages/Material.Message"



export class GetEditMaterialUseCase implements IGetEditMaterialUseCaseEntity {
   private materialRepository: IMaterialRepositoryEntity
   private categoryRepository: ICategoryRepositoryEntity
   private brandRepository: IBrandRepositoryEntity
   private unitRepository: IUnitRepositoryEntity
   private projectStockRepository: IProjectStockRepositoryEntity
   constructor(materialRepository: IMaterialRepositoryEntity, categoryRepository: ICategoryRepositoryEntity,
      brandRepository: IBrandRepositoryEntity, unitRepository: IUnitRepositoryEntity,
      projectStockRepository: IProjectStockRepositoryEntity) {
      this.materialRepository = materialRepository
      this.categoryRepository = categoryRepository
      this.brandRepository = brandRepository
      this.unitRepository = unitRepository
      this.projectStockRepository = projectStockRepository
   }

   async execute(_id: string): Promise<materialOutput | commonOutput> {
      const material_id = _id
      const categoryData = await this.categoryRepository.findAllCategory()
      const brandData = await this.brandRepository.findAllBrand()
      const unitData = await this.unitRepository.findUnit()
      const materialData = await this.materialRepository.findMaterialById(_id)
      const projectStockData = await this.projectStockRepository.findProjectStockByMaterialId(material_id)
      return ResponseHelper.success(MaterialSuccessMessage.EDITFETCH, { categoryData, brandData, unitData, materialData, projectStockData })
   }
}


