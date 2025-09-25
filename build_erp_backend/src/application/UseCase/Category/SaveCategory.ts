import { ISaveCategoryUseCase } from '../../IUseCases/ICategory/ISaveCategory';
import { ResponseHelper } from '../../../Shared/responseHelpers/response';
import { CategoryFailedMessage, CategorySuccessMessage } from '../../../Shared/Messages/Category.Message';
import { ICategoryRepository } from '../../../domain/Entities/IRepository/ICategory';
import { saveCategoryInput } from '../../entities/category.entity';
import { commonOutput } from '../../dto/common';




export class SaveCategoryUseCase implements ISaveCategoryUseCase {
    constructor(
      private _categoryRepository: ICategoryRepository,
    ) { }
    async execute(input: saveCategoryInput):
      Promise<commonOutput> {
        const { category_name, description } = input;
        const ExistCategory = await this._categoryRepository.getCategoryByName(category_name);
        if (ExistCategory) {
            return ResponseHelper.conflictData(CategoryFailedMessage.EXIST_CATEGORY);
        }
        const response = await this._categoryRepository.createCategory({ category_name, description });
        if (!response) throw new Error(CategoryFailedMessage.FAILED_SAVE);
        return ResponseHelper.createdSuccess(CategorySuccessMessage.ADD);
    }
}