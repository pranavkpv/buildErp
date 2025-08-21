import { ResponseHelper } from "../../../Shared/responseHelpers/response";
import { IDisplayAllCategoryUseCase } from "../../interfaces/Category.UseCase.Entities/DisplayAllCategoryEntity";
import { CategorySuccessMessage } from "../../../Shared/Messages/Category.Message";
import { ICategoryRepository } from "../../../domain/interfaces/Material-management/ICategoryRepository";
import { listingInput } from "../../entities/common.entity";
import { commonOutput } from "../../dto/common";
import { categoryListDTO } from "../../dto/category.dto";
import { ICategorymapper } from "../../../domain/mappers/ICategory.mapper";


export class DisplayAllCategoryUseCase implements IDisplayAllCategoryUseCase {
   constructor(
      private _categoryRepository: ICategoryRepository,
      private _categorymapper: ICategorymapper
   ) { }
   async execute(input: listingInput): Promise<commonOutput<{ data: categoryListDTO[], totalPage: number }> | void> {
      const { data, totalPage } = await this._categoryRepository.findAllListCategory(input)
      const mappedData = this._categorymapper.toListCategoryDTO(data)
      return ResponseHelper.success(CategorySuccessMessage.FETCH, { data: mappedData, totalPage })
   }
}


