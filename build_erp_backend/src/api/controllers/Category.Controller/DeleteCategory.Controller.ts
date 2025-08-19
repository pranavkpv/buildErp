import { Request, Response, NextFunction } from "express";
import { IDeleteCategoryControllerEntity } from "../../../domain/Entities/ControllerEntities/Category.Controller.Entities/DeleteCategory.Controller.Entity";
import { commonOutput } from "../../../application/dto/CommonEntities/common";
import { IDeleteCategoryUseCaseEntity } from "../../../application/interfaces/Category.UseCase.Entities/DeleteCategoryEntity";
import { ResponseHelper } from "../../../Shared/responseHelpers/response";
import { CategoryFailedMessage } from "../../../Shared/Messages/Category.Message";

export class DeletecategoryController implements IDeleteCategoryControllerEntity {
   constructor(private deleteCategoryUseCase: IDeleteCategoryUseCaseEntity) { }
   deleteCategoryHandler = async (req: Request, res: Response, next: NextFunction): Promise<commonOutput | void> => {
      try {
         const categoryId = req.params.id;
         if (!categoryId) {
            return ResponseHelper.badRequest(CategoryFailedMessage.NEED_CATEGORY)
         }
         const result = await this.deleteCategoryUseCase.execute(req.params.id)
         return result
      } catch (error) {
         next(error)
      }
   }
}