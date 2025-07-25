import { ICategoryRepository } from "../../../Entities/repositoryEntities/Material-management/ICategoryRepository"
import { commonOutput } from "../../../Entities/Input-OutputEntities/CommonEntities/common"
import { addcategoryInput } from "../../../Entities/Input-OutputEntities/MaterialEntities/category"
import { ISaveCategoryUseCase } from "../../../Entities/useCaseEntities/AdminUseCaseEntities/CategoryUseCaseEntities/SaveCategoryEntity"
import { ResponseHelper } from "../../../Shared/utils/response"
import { ERROR_MESSAGE, SUCCESS_MESSAGE } from "../../../Shared/Message"
import { HTTP_STATUS } from "../../../Shared/Status_code"


export class SaveCategoryUseCase implements ISaveCategoryUseCase {
   private categoryRepository: ICategoryRepository
   constructor(categoryRepository: ICategoryRepository) {
      this.categoryRepository = categoryRepository
   }
   async execute(input: addcategoryInput): Promise<commonOutput> {
      const { category_name, description } = input
      const ExistCategory = await this.categoryRepository.findByCategoryName(category_name)
      if (ExistCategory) {
         return ResponseHelper.failure(ERROR_MESSAGE.CATEGORY.EXIST_CATEGORY,HTTP_STATUS.CONFLICT)
      }
      await this.categoryRepository.saveCategory(category_name, description)
      return ResponseHelper.success(SUCCESS_MESSAGE.CATEGORY.ADD,HTTP_STATUS.CREATED)
   }
}