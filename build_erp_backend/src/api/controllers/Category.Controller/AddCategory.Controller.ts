import { Request, Response, NextFunction } from "express";
import { IAddCategoryController } from "../../../domain/Entities/ControllerEntities/Category.Controller.Entities/AddCategory.Controller.Entity";
import { ISaveCategoryUseCaseEntity } from "../../../application/interfaces/Category.UseCase.Entities/SaveCategoryEntity";
import { commonOutput } from "../../../application/dto/common";

export class AddCategoryController implements IAddCategoryController {
   constructor(private _addCategoryUseCase: ISaveCategoryUseCaseEntity) { }
   addCategoryHandler = async (req: Request, res: Response, next: NextFunction): Promise<commonOutput | void> => {
      const result = await this._addCategoryUseCase.execute(req.body)
      return result
   }
}