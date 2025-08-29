import { IMaterialRepository } from '../../../domain/Entities/IRepository/IMaterial';
import { IDeleteCategoryUseCase } from '../../IUseCases/ICategory/IDeleteCategory';
import { ResponseHelper } from '../../../Shared/responseHelpers/response';
import { ICategoryRepository } from '../../../domain/Entities/IRepository/ICategory';
import { CategoryFailedMessage, CategorySuccessMessage } from '../../../Shared/Messages/Category.Message';
import { commonOutput } from '../../dto/common';


export class DeleteCategoryUseCase implements IDeleteCategoryUseCase {
    constructor(
      private _categoryRepository: ICategoryRepository,
      private _materialRepository: IMaterialRepository,
    ) { }
    async execute(id: string):
      Promise<commonOutput> {
        const findcategory = await this._categoryRepository.getCategoryById(id);
        if (!findcategory) return ResponseHelper.conflictData(CategoryFailedMessage.CATEGORY_NOT_EXIST);
        const existCategory = await this._materialRepository.getMaterialByCategoryId(id);
        if (existCategory) return ResponseHelper.conflictData(CategoryFailedMessage.ALREADY_USED);
        const response = await this._categoryRepository.deleteCategory(id);
        if (!response) throw new Error(CategoryFailedMessage.FAILED_DELETE);
        return ResponseHelper.success(CategorySuccessMessage.DELETE);
    }
}