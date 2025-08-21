import { Request, Response, NextFunction } from "express";
import { IDeleteCategoryController } from "../../../domain/Entities/ControllerEntities/Category.Controller.Entities/DeleteCategory.Controller.Entity";
import { IDeleteCategoryUseCase } from "../../../application/interfaces/Category.UseCase.Entities/DeleteCategoryEntity";
import { ResponseHelper } from "../../../Shared/responseHelpers/response";
import { CategoryFailedMessage } from "../../../Shared/Messages/Category.Message";
import { commonOutput } from "../../../application/dto/common";

export class DeletecategoryController implements IDeleteCategoryController {
   constructor(
      private _deleteCategoryUseCase: IDeleteCategoryUseCase
   ) { }
   deleteCategoryHandler = async (req: Request, res: Response, next: NextFunction): Promise<commonOutput> => {
      const categoryId = req.params.id;
      if (!categoryId) {
         return ResponseHelper.badRequest(CategoryFailedMessage.NEED_CATEGORY)
      }
      const result = await this._deleteCategoryUseCase.execute(req.params.id)
      return result
   }
}