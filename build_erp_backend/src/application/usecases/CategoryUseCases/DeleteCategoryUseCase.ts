import { IMaterialRepository } from "../../../domain/interfaces/Material-management/IMaterialRepository"
import { IDeleteCategoryUseCase } from "../../interfaces/Category.UseCase.Entities/DeleteCategoryEntity"
import { ResponseHelper } from "../../../Shared/responseHelpers/response"
import { ICategoryRepository } from "../../../domain/interfaces/Material-management/ICategoryRepository"
import { CategoryFailedMessage, CategorySuccessMessage } from "../../../Shared/Messages/Category.Message"
import { commonOutput } from "../../dto/common"


export class DeleteCategoryUseCase implements IDeleteCategoryUseCase {
   constructor(
      private _categoryRepository: ICategoryRepository,
      private _materialRepository: IMaterialRepository
   ) { }
   async execute(_id: string): Promise<commonOutput> {
      const findcategory = await this._categoryRepository.findCategoryById(_id)
      if (!findcategory) return ResponseHelper.conflictData(CategoryFailedMessage.CATEGORY_NOT_EXIST)
      const existCategory = await this._materialRepository.findMaterialByCategoryId(_id)
      if (existCategory) return ResponseHelper.conflictData(CategoryFailedMessage.ALREADY_USED)
      const response = await this._categoryRepository.deleteCategoryById(_id)
      if (!response) throw new Error(CategoryFailedMessage.FAILED_DELETE)
      return ResponseHelper.success(CategorySuccessMessage.DELETE)
   }
}