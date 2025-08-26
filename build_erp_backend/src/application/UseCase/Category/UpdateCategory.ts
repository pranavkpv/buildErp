import { ResponseHelper } from "../../../Shared/responseHelpers/response"
import { CategoryFailedMessage, CategorySuccessMessage } from "../../../Shared/Messages/Category.Message"
import { IUpdateCategoryUseCase } from "../../IUseCases/ICategory/IUpdateCategory"
import { ICategoryRepository } from "../../../domain/Entities/IRepository/ICategory"
import { commonOutput } from "../../dto/common"
import { saveCategoryInput } from "../../Entities/category.entity"

export class UpdateCategoryUseCase implements IUpdateCategoryUseCase {
   constructor(
      private _categoryRepository: ICategoryRepository
   ) { }
   async execute(input: saveCategoryInput):
      Promise<commonOutput> {
      const { _id, category_name, description } = input
      if (!_id) throw new Error(CategoryFailedMessage.MISS_CATEGORY_ID)
      const findcategory = await this._categoryRepository.getCategoryById(_id)
      if (!findcategory) return ResponseHelper.conflictData(CategoryFailedMessage.CATEGORY_NOT_EXIST)
      const existData = await this._categoryRepository.getCategoryForEdit(_id, category_name)
      if (existData) {
         return ResponseHelper.conflictData(CategoryFailedMessage.EXIST_CATEGORY)
      }
      const response = await this._categoryRepository.updateCategory({ _id, category_name, description })
      if (!response) throw new Error(CategoryFailedMessage.FAILED_UPDATE)
      return ResponseHelper.success(CategorySuccessMessage.UPDATE)
   }
}