import { IBrandRepository } from "../../../domain/repositories/IBrandRepository"
import { ICategoryRepository } from "../../../domain/repositories/ICategoryRepository"
import { IMaterialRepository } from "../../../domain/repositories/IMaterialRepository"
import { IProjectStockRepository } from "../../../domain/repositories/IProjectStockRepository"
import { IUnitRepository } from "../../../domain/repositories/IUnitRepository"
import { getEditMaterialData, outEditMaterialData } from "../../../domain/types/material"


export class GetEditMaterialUseCase {
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


