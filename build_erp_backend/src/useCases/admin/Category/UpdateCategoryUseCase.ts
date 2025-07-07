import { ICategoryRepository } from "../../../domain/repositories/ICategoryRepository"
import { editCategoryInput, outputCategory } from "../../../domain/types/category"



export class UpdateCategoryUseCase {
   private categoryRepository: ICategoryRepository
   constructor(categoryRepository: ICategoryRepository) {
      this.categoryRepository = categoryRepository
   }
   async execute(input: editCategoryInput): Promise<outputCategory> {
      const { _id, category_name, description } = input
      const existData = await this.categoryRepository.findCategoryInEdit(_id, category_name)
      if (existData) {
         return { success: false, message: "category already exist" }
      }
      await this.categoryRepository.updateCategoryById(_id, category_name, description)
      return { success: true, message: "category updated successfully" }
   }
}