import { ICategoryRepository } from "../../../domain/repositories/ICategoryRepository"
import { IMaterialRepository } from "../../../domain/repositories/IMaterialRepository"
import { deleteCategoryInput, outputCategory } from "../../../domain/types/category"




export class DeleteCategoryUseCase {
   private categoryRepository: ICategoryRepository
   private materialRepository : IMaterialRepository
   constructor(categoryRepository: ICategoryRepository,materialRepository : IMaterialRepository) {
      this.categoryRepository = categoryRepository
      this.materialRepository = materialRepository
   }
   async execute(input:deleteCategoryInput): Promise<outputCategory> {
      const {_id} = input
      const existCategory = await this.materialRepository.findMaterialByCategoryId(_id)
      if(existCategory){
         return { success: false, message: "category used already" }
      }
      await this.categoryRepository.deleteCategoryById(_id)
       return { success: true, message: "category deleted successfully" }
   }
}