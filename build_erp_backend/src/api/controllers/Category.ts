import { Request, Response, NextFunction } from 'express';
import { commonOutput } from '../../application/dto/common';
import { ICategoryController } from '../../domain/Entities/IController/ICategory';
import { IDisplayAllCategoryUseCase } from '../../application/IUseCases/ICategory/IDisplayAllCategory';
import { categoryListDTO } from '../../application/dto/category.dto';
import { IUpdateCategoryUseCase } from '../../application/IUseCases/ICategory/IUpdateCategory';
import { ResponseHelper } from '../../Shared/responseHelpers/response';
import { IDeleteCategoryUseCase } from '../../application/IUseCases/ICategory/IDeleteCategory';
import { CategoryFailedMessage } from '../../Shared/Messages/Category.Message';
import { ISaveCategoryUseCase } from '../../application/IUseCases/ICategory/ISaveCategory';

export class CategoryController implements ICategoryController {
    constructor(
      private _addCategoryUseCase: ISaveCategoryUseCase,
      private _displayAllCategoryUseCase: IDisplayAllCategoryUseCase,
      private _updateCategoryUseCase: IUpdateCategoryUseCase,
      private _deleteCategoryUseCase: IDeleteCategoryUseCase,
    ) { }

    // Add a new category
    createCategory = async(req: Request, res: Response, next: NextFunction):
      Promise<commonOutput | void> => {
        try {
            const result = await this._addCategoryUseCase.execute(req.body);
            return result;
        } catch (error) {
            next(error);
        }
    };

    // Fetch all categories with pagination and search
    getAllCategories = async(req: Request, res: Response, next: NextFunction):
      Promise<commonOutput<{ data: categoryListDTO[]; totalPages: number }> | void> => {
        try {
            const { page, search } = req.query;
            const pageNum = Number(page);
            const result = await this._displayAllCategoryUseCase.execute({
                page: pageNum,
                search: String(search),
            });
            return result;
        } catch (error) {
            next(error);
        }
    };

    // Update an existing category
    updateCategory = async(req: Request, res: Response, next: NextFunction):
      Promise<commonOutput | void> => {
        try {
            const _id = req.params.id;
            const result = await this._updateCategoryUseCase.execute({ _id, ...req.body });
            return result;
        } catch (error) {
            next(error);
        }
    };

    // Delete a category by ID
    deleteCategory = async(req: Request, res: Response, next: NextFunction):
      Promise<commonOutput | void> => {
        try {
            const categoryId = req.params.id;
            if (!categoryId) {
                return ResponseHelper.badRequest(CategoryFailedMessage.NEED_CATEGORY);
            }
            const result = await this._deleteCategoryUseCase.execute(categoryId);
            return result;
        } catch (error) {
            next(error);
        }
    };
}
