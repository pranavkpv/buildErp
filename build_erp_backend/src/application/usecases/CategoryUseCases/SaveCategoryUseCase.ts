import { ISaveCategoryUseCaseEntity } from "../../interfaces/Category.UseCase.Entities/SaveCategoryEntity"
import { ResponseHelper } from "../../../Shared/responseHelpers/response"
import { CategoryFailedMessage, CategorySuccessMessage } from "../../../Shared/Messages/Category.Message"
import { ICategoryRepository } from "../../../domain/interfaces/Material-management/ICategoryRepository"
import { saveCategoryInput } from "../../entities/category.entity"
import { commonOutput } from "../../dto/common"




export class SaveCategoryUseCase implements ISaveCategoryUseCaseEntity {
   constructor(
      private _categoryRepository: ICategoryRepository
   ) { }
   async execute(input: saveCategoryInput): Promise<commonOutput> {
      const { category_name, description } = input
      const ExistCategory = await this._categoryRepository.findByCategoryName(category_name )
      if (ExistCategory) {
         return ResponseHelper.conflictData(CategoryFailedMessage.EXIST_CATEGORY)
      }
      const response = await this._categoryRepository.saveCategory({ category_name, description })
      if (!response) throw new Error(CategoryFailedMessage.FAILED_SAVE)
      return ResponseHelper.createdSuccess(CategorySuccessMessage.ADD)
   }
}