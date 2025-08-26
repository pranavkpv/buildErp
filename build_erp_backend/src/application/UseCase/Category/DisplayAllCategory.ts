import { ResponseHelper } from "../../../Shared/responseHelpers/response";
import { IDisplayAllCategoryUseCase } from "../../IUseCases/ICategory/IDisplayAllCategory";
import { CategorySuccessMessage } from "../../../Shared/Messages/Category.Message";
import { ICategoryRepository } from "../../../domain/Entities/IRepository/ICategory";
import { listingInput } from "../../Entities/common.entity";
import { commonOutput } from "../../dto/common";
import { categoryListDTO } from "../../dto/category.dto";
import { ICategorymapper } from "../../../domain/mappers/ICategory.mapper";


export class DisplayAllCategoryUseCase implements IDisplayAllCategoryUseCase {
   constructor(
      private _categoryRepository: ICategoryRepository,
      private _categorymapper: ICategorymapper
   ) { }
   async execute(input: listingInput):
      Promise<commonOutput<{ data: categoryListDTO[], totalPages: number }> | void> {
      const { data, totalPages } = await this._categoryRepository.getCategoriesWithPagination(input)
      const mappedData = this._categorymapper.toListCategoryDTO(data)
      return ResponseHelper.success(CategorySuccessMessage.FETCH, { data: mappedData, totalPages })
   }
}


