import { commonOutput } from "../../../Entities/Input-OutputEntities/CommonEntities/common";
import { ICategoryRepository } from "../../../Entities/repositoryEntities/Material-management/ICategoryRepository";
import { IDisplayAllCategoryUseCase } from "../../../Entities/useCaseEntities/AdminUseCaseEntities/CategoryUseCaseEntities/DisplayAllCategoryEntity";
import { HTTP_STATUS } from "../../../Shared/Status_code";
import { ResponseHelper } from "../../../Shared/utils/response";



export class DisplayAllCategoryUseCase implements IDisplayAllCategoryUseCase {
   private categoryRepository: ICategoryRepository
   constructor(categoryRepository: ICategoryRepository) {
      this.categoryRepository = categoryRepository
   }
   async execute(page: number, search: string): Promise<{ getCategoryData: any[]; totalPage: number } | commonOutput> {
      try {
         const { getCategoryData, totalPage } = await this.categoryRepository.findAllListCategory(page, search)
         return {
            getCategoryData,
            totalPage
         }
      } catch (error:any) {
         return ResponseHelper.failure(error.message, HTTP_STATUS.INTERNAL_SERVER_ERROR)
      }
   }
}


