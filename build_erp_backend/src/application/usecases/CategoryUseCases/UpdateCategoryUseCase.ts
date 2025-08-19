import { ICategoryRepositoryEntity } from "../../../domain/interfaces/Material-management/ICategoryRepository"
import { commonOutput } from "../../dto/CommonEntities/common"
import { IUpdateCategoryUseCaseEntity } from "../../interfaces/Category.UseCase.Entities/UpdateCategoryEntity"
import { ResponseHelper } from "../../../Shared/responseHelpers/response"
import { ICategoryModelEntity } from "../../../domain/Entities/modelEntities/category.entity"
import { CategoryFailedMessage, CategorySuccessMessage } from "../../../Shared/Messages/Category.Message"

export class UpdateCategoryUseCase implements IUpdateCategoryUseCaseEntity {
   private categoryRepository: ICategoryRepositoryEntity
   constructor(categoryRepository: ICategoryRepositoryEntity) {
      this.categoryRepository = categoryRepository
   }
   async execute(input: ICategoryModelEntity): Promise<commonOutput> {
      const { _id, category_name, description } = input
      if (!_id) throw new Error(CategoryFailedMessage.MISS_CATEGORY_ID)
      const findcategory = await this.categoryRepository.findCategoryById(_id)
      if (!findcategory) return ResponseHelper.conflictData(CategoryFailedMessage.CATEGORY_NOT_EXIST)
      const existData = await this.categoryRepository.findCategoryInEdit({ _id, category_name })
      if (existData) {
         return ResponseHelper.conflictData(CategoryFailedMessage.EXIST_CATEGORY)
      }
      const response = await this.categoryRepository.updateCategoryById({ _id, category_name, description })
      if (!response) throw new Error(CategoryFailedMessage.FAILED_UPDATE)
      return ResponseHelper.success(CategorySuccessMessage.UPDATE)
   }
}