import { commonOutput } from "../../../Entities/Input-OutputEntities/CommonEntities/common";
import { CategoryOutput } from "../../../Entities/Input-OutputEntities/MaterialEntities/category";
import { ICategoryRepository } from "../../../Entities/repositoryEntities/Material-management/ICategoryRepository";
import { IDisplayAllCategoryUseCase } from "../../../Entities/useCaseEntities/AdminUseCaseEntities/CategoryUseCaseEntities/DisplayAllCategoryEntity";
import { SUCCESS_MESSAGE } from "../../../Shared/Message";
import { HTTP_STATUS } from "../../../Shared/Status_code";
import { ResponseHelper } from "../../../Shared/utils/response";



export class DisplayAllCategoryUseCase implements IDisplayAllCategoryUseCase {
   private categoryRepository: ICategoryRepository
   constructor(categoryRepository: ICategoryRepository) {
      this.categoryRepository = categoryRepository
   }
   async execute(page: number, search: string): Promise<CategoryOutput | commonOutput> {
      try {
         const {data,totalPage} = await this.categoryRepository.findAllListCategory(page, search)
         return {
            success:true,
            message:SUCCESS_MESSAGE.CATEGORY.FETCH,
            status_code:HTTP_STATUS.OK,
            data,
            totalPage
         }
      } catch (error:any) {
         return ResponseHelper.failure(error.message, HTTP_STATUS.INTERNAL_SERVER_ERROR)
      }
   }
}


