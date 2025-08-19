import { commonOutput } from "../../dto/CommonEntities/common"
import { ISaveCategoryUseCaseEntity } from "../../interfaces/Category.UseCase.Entities/SaveCategoryEntity"
import { ResponseHelper } from "../../../Shared/responseHelpers/response"
import { ICategoryModelEntity } from "../../../domain/Entities/modelEntities/category.entity"
import { CategoryFailedMessage, CategorySuccessMessage } from "../../../Shared/Messages/Category.Message"
import { ICategoryRepositoryEntity } from "../../../domain/interfaces/Material-management/ICategoryRepository"



export class SaveCategoryUseCase implements ISaveCategoryUseCaseEntity {
   private categoryRepository: ICategoryRepositoryEntity
   constructor(categoryRepository: ICategoryRepositoryEntity) {
      this.categoryRepository = categoryRepository
   }
   async execute(input: ICategoryModelEntity): Promise<commonOutput> {
      const { category_name, description } = input
      //--------Checking the category already existing in database--------//
      const ExistCategory = await this.categoryRepository.findByCategoryName({ category_name })
      if (ExistCategory) {
         return ResponseHelper.conflictData(CategoryFailedMessage.EXIST_CATEGORY)
      }
      //--------Save the category--------//
      const response = await this.categoryRepository.saveCategory({ category_name, description })
      if (!response) throw new Error(CategoryFailedMessage.FAILED_SAVE)
      return ResponseHelper.createdSuccess(CategorySuccessMessage.ADD)
   }
}