import { IMaterialRepositoryEntity } from "../../../domain/interfaces/Material-management/IMaterialRepository"
import { commonOutput } from "../../dto/CommonEntities/common"
import { IDeleteCategoryUseCaseEntity } from "../../interfaces/Category.UseCase.Entities/DeleteCategoryEntity"
import { ResponseHelper } from "../../../Shared/responseHelpers/response"
import { ICategoryRepositoryEntity } from "../../../domain/interfaces/Material-management/ICategoryRepository"
import { CategoryFailedMessage, CategorySuccessMessage } from "../../../Shared/Messages/Category.Message"


export class DeleteCategoryUseCase implements IDeleteCategoryUseCaseEntity {
   private categoryRepository: ICategoryRepositoryEntity
   private materialRepository: IMaterialRepositoryEntity
   constructor(categoryRepository: ICategoryRepositoryEntity, materialRepository: IMaterialRepositoryEntity) {
      this.categoryRepository = categoryRepository
      this.materialRepository = materialRepository
   }
   async execute(_id: string): Promise<commonOutput> {
      const findcategory = await this.categoryRepository.findCategoryById(_id)
      if (!findcategory) return ResponseHelper.conflictData(CategoryFailedMessage.CATEGORY_NOT_EXIST)
      const existCategory = await this.materialRepository.findMaterialByCategoryId(_id)
      if (existCategory) return ResponseHelper.conflictData(CategoryFailedMessage.ALREADY_USED)
      const response = await this.categoryRepository.deleteCategoryById(_id)
      if (!response) throw new Error(CategoryFailedMessage.FAILED_DELETE)
      return ResponseHelper.success(CategorySuccessMessage.DELETE)
   }
}