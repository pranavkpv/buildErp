import { ICategoryRepository } from "../../../domain/repositories/ICategoryRepository"
import { addcategoryInput, outputCategory } from "../../../domain/types/category"


export class SaveCategoryUseCase {
   private categoryRepository: ICategoryRepository
   constructor(categoryRepository: ICategoryRepository) {
      this.categoryRepository = categoryRepository
   }
   async execute(input: addcategoryInput): Promise<outputCategory> {
      const { category_name, description } = input
      const ExistCategory = await this.categoryRepository.findByCategoryName(category_name)
      if (ExistCategory) {
         return { success: false, message: "Category already exist" }
      }
      await this.categoryRepository.saveCategory(category_name, description)
      return { success: true, message: "category saved successfully" }

   }
}