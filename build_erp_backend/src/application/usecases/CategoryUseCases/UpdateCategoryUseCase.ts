import { ResponseHelper } from "../../../Shared/responseHelpers/response"
import { CategoryFailedMessage, CategorySuccessMessage } from "../../../Shared/Messages/Category.Message"
import { IUpdateCategoryUseCase } from "../../interfaces/Category.UseCase.Entities/UpdateCategoryEntity"
import { ICategoryRepository } from "../../../domain/interfaces/Material-management/ICategoryRepository"
import { commonOutput } from "../../dto/common"
import { saveCategoryInput } from "../../entities/category.entity"

export class UpdateCategoryUseCase implements IUpdateCategoryUseCase {
   constructor(
       private _categoryRepository: ICategoryRepository
   ) { }
   async execute(input: saveCategoryInput): Promise<commonOutput> {
      const { _id, category_name, description } = input
      if (!_id) throw new Error(CategoryFailedMessage.MISS_CATEGORY_ID)
      const findcategory = await this._categoryRepository.findCategoryById(_id)
      if (!findcategory) return ResponseHelper.conflictData(CategoryFailedMessage.CATEGORY_NOT_EXIST)
      const existData = await this._categoryRepository.findCategoryInEdit(_id, category_name )
      if (existData) {
         return ResponseHelper.conflictData(CategoryFailedMessage.EXIST_CATEGORY)
      }
      const response = await this._categoryRepository.updateCategoryById({ _id, category_name, description })
      if (!response) throw new Error(CategoryFailedMessage.FAILED_UPDATE)
      return ResponseHelper.success(CategorySuccessMessage.UPDATE)
   }
}