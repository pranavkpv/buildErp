
import { IBrandRepository } from "../../../Entities/repositoryEntities/Material-management/IBrandRepository"
import { ICategoryRepository } from "../../../Entities/repositoryEntities/Material-management/ICategoryRepository"
import { IMaterialRepository } from "../../../Entities/repositoryEntities/Material-management/IMaterialRepository"
import { IUnitRepository } from "../../../Entities/repositoryEntities/Material-management/IUnitRepository"
import { IProjectStockRepository } from "../../../Entities/repositoryEntities/Stock-management/IProjectStockRepository"
import { outEditMaterialData } from "../../../Entities/Input-OutputEntities/MaterialEntities/material"
import { IGetEditMaterialUseCase } from "../../../Entities/useCaseEntities/AdminUseCaseEntities/MaterialUseCaseEntities/GetEditMaterialEntity"



export class GetEditMaterialUseCase implements IGetEditMaterialUseCase {
   private materialRepository: IMaterialRepository
   private categoryRepository: ICategoryRepository
   private brandRepository: IBrandRepository
   private unitRepository: IUnitRepository
   private projectStockRepository: IProjectStockRepository
   constructor(materialRepository: IMaterialRepository, categoryRepository: ICategoryRepository, brandRepository: IBrandRepository, unitRepository: IUnitRepository, projectStockRepository: IProjectStockRepository) {
      this.materialRepository = materialRepository
      this.categoryRepository = categoryRepository
      this.brandRepository = brandRepository
      this.unitRepository = unitRepository
      this.projectStockRepository = projectStockRepository
   }

   async execute(_id:string): Promise<outEditMaterialData> {
      const material_id = _id
      const categoryData = await this.categoryRepository.findAllCategory()
      const brandData = await this.brandRepository.findAllBrand()
      const unitData = await this.unitRepository.findUnit()
      const materialData = await this.materialRepository.findMaterialById(_id)
      const projectStockData = await this.projectStockRepository.findProjectStockByMaterialId(material_id)

      return { categoryData, brandData, unitData, materialData, projectStockData }
   }
}


