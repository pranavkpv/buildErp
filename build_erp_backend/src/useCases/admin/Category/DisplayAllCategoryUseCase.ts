import { ICategoryRepository } from "../../../Entities/repositoryEntities/Material-management/ICategoryRepository";
import { IDisplayAllCategoryUseCase } from "../../../Entities/useCaseEntities/AdminUseCaseEntities/CategoryUseCaseEntities/DisplayAllCategoryEntity";



export class DisplayAllCategoryUseCase implements IDisplayAllCategoryUseCase {
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


