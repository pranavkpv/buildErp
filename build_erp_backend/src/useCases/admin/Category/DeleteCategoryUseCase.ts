import { ICategoryRepository } from "../../../Entities/repositoryEntities/Material-management/ICategoryRepository"
import { IMaterialRepository } from "../../../Entities/repositoryEntities/Material-management/IMaterialRepository"
import { commonOutput } from "../../../Entities/Input-OutputEntities/CommonEntities/common"
import { IDeleteCategoryUseCase } from "../../../Entities/useCaseEntities/AdminUseCaseEntities/CategoryUseCaseEntities/DeleteCategoryEntity"
import { ResponseHelper } from "../../../Shared/utils/response"
import { ERROR_MESSAGE, SUCCESS_MESSAGE } from "../../../Shared/Message"
import { HTTP_STATUS } from "../../../Shared/Status_code"


export class DeleteCategoryUseCase implements IDeleteCategoryUseCase {
   private categoryRepository: ICategoryRepository
   private materialRepository: IMaterialRepository
   constructor(categoryRepository: ICategoryRepository, materialRepository: IMaterialRepository) {
      this.categoryRepository = categoryRepository
      this.materialRepository = materialRepository
   }
   async execute(_id: string): Promise<commonOutput> {
      try {
         const existCategory = await this.materialRepository.findMaterialByCategoryId(_id)
         if (existCategory) {
            return ResponseHelper.failure(ERROR_MESSAGE.CATEGORY.ALREADY_USED, HTTP_STATUS.CONFLICT)
         }
         await this.categoryRepository.deleteCategoryById(_id)
         return ResponseHelper.success(SUCCESS_MESSAGE.CATEGORY.DELETE, HTTP_STATUS.OK)
      } catch (error: any) {
         return ResponseHelper.failure(error.message, HTTP_STATUS.INTERNAL_SERVER_ERROR)
      }
   }
}