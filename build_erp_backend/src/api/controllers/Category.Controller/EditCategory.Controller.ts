import { Request, Response, NextFunction } from "express";
import { IEditCategoryController } from "../../../domain/Entities/ControllerEntities/Category.Controller.Entities/EditCategory.Controller.Entity";
import { IUpdateCategoryUseCase } from "../../../application/interfaces/Category.UseCase.Entities/UpdateCategoryEntity";
import { commonOutput } from "../../../application/dto/common";

export class EditCategoryController implements IEditCategoryController {
   constructor(private editcategoryUseCase: IUpdateCategoryUseCase) { }
   editCategoryHandler = async (req: Request, res: Response, next: NextFunction): Promise<commonOutput> => {
      const _id = req.params.id
      const result = await this.editcategoryUseCase.execute({ _id, ...req.body })
      return result

   }
}