import { ICategoryRepository } from "../../../Entities/repositoryEntities/Material-management/ICategoryRepository"
import { commonOutput } from "../../../Entities/Input-OutputEntities/CommonEntities/common"
import { editCategoryInput } from "../../../Entities/Input-OutputEntities/MaterialEntities/category"
import { IUpdateCategoryUseCase } from "../../../Entities/useCaseEntities/AdminUseCaseEntities/CategoryUseCaseEntities/UpdateCategoryEntity"
import { ResponseHelper } from "../../../Shared/utils/response"
import { ERROR_MESSAGE, SUCCESS_MESSAGE } from "../../../Shared/Message"
import { HTTP_STATUS } from "../../../Shared/Status_code"



export class UpdateCategoryUseCase implements IUpdateCategoryUseCase {
   private categoryRepository: ICategoryRepository
   constructor(categoryRepository: ICategoryRepository) {
      this.categoryRepository = categoryRepository
   }
   async execute(input: editCategoryInput): Promise<commonOutput> {
      try {
         const { _id, category_name, description } = input
         const existData = await this.categoryRepository.findCategoryInEdit(_id, category_name)
         if (existData) {
            return ResponseHelper.failure(ERROR_MESSAGE.CATEGORY.EXIST_CATEGORY, HTTP_STATUS.CONFLICT)
         }
         await this.categoryRepository.updateCategoryById(_id, category_name, description)
         return ResponseHelper.success(SUCCESS_MESSAGE.CATEGORY.UPDATE, HTTP_STATUS.OK)
      } catch (error:any) {
         return ResponseHelper.failure(error.message, HTTP_STATUS.INTERNAL_SERVER_ERROR)
      }
   }
}