import { commonOutput } from "../../dto/CommonEntities/common";
import { ResponseHelper } from "../../../Shared/responseHelpers/response";
import { IDisplayAllCategoryUseCaseEntity } from "../../interfaces/Category.UseCase.Entities/DisplayAllCategoryEntity";
import { CategorySuccessMessage } from "../../../Shared/Messages/Category.Message";
import { ICategoryRepositoryEntity } from "../../../domain/interfaces/Material-management/ICategoryRepository";
import { categoryInput } from "../../dto/CategoryEntities/Category.Entity";


export class DisplayAllCategoryUseCase implements IDisplayAllCategoryUseCaseEntity {
   private categoryRepository: ICategoryRepositoryEntity
   constructor(categoryRepository: ICategoryRepositoryEntity) {
      this.categoryRepository = categoryRepository
   }
   async execute(page: number, search: string): Promise<commonOutput> {
      const { data, totalPage } = await this.categoryRepository.findAllListCategory(page, search)
      const mappedData = data.map((cat: categoryInput) => ({
         _id: cat._id,
         category_name: cat.category_name,
         description: cat.description
      }))
      return ResponseHelper.success(CategorySuccessMessage.FETCH, mappedData, totalPage)
   }
}


