import { IBrandRepository } from "../../../domain/repositories/IBrandRepository"
import { ICategoryRepository } from "../../../domain/repositories/ICategoryRepository"
import { IMaterialRepository } from "../../../domain/repositories/IMaterialRepository"
import { IUnitRepository } from "../../../domain/repositories/IUnitRepository"
import { getAddMaterialData } from "../../../domain/types/material"



export class DisplayAddMaterialDataUseCase {
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
   async execute(): Promise<getAddMaterialData> {
      const categoryData = await this.categoryRepository.findAllCategory()
      const brandData = await this.brandRepository.findAllBrand()
      const unitData = await this.unitRepository.findUnit()
      const projectData = await this.materialRepository.findAllProject()
      return { categoryData, brandData, unitData, projectData }
   }

}

