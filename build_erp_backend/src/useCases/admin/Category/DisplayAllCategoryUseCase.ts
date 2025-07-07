import { ICategoryRepository } from "../../../domain/repositories/ICategoryRepository";



export class DisplayAllCategoryUseCase {
   private categoryRepository: ICategoryRepository
   constructor(categoryRepository: ICategoryRepository) {
      this.categoryRepository = categoryRepository
   }
   async execute(page:number,search:string): Promise<{getCategoryData:any[];totalPage:number }> {
      const {getCategoryData,totalPage} = await this.categoryRepository.findAllListCategory(page, search)
      return {
         getCategoryData ,
         totalPage
      }
   }
}


