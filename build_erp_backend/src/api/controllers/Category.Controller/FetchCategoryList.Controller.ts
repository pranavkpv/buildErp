import { Request, Response, NextFunction } from "express";
import { IFetchCategoryListControllerEntity } from "../../../domain/Entities/ControllerEntities/Category.Controller.Entities/FetchCategory.Controller.Entity";
import { IDisplayAllCategoryUseCase } from "../../../application/interfaces/Category.UseCase.Entities/DisplayAllCategoryEntity";
import { commonOutput } from "../../../application/dto/common";
import { categoryListDTO } from "../../../application/dto/category.dto";

export class FetchCategoryListController implements IFetchCategoryListControllerEntity {
   constructor(private _displayAllCategoryUseCase: IDisplayAllCategoryUseCase) { }
   categoryListHandler = async (req: Request, res: Response, next: NextFunction): Promise<commonOutput<{data:categoryListDTO[],totalPage:number}> | void> => {
      const { page, search } = req.query
      const pageNum = Number(page);
      const result = await this._displayAllCategoryUseCase.execute({ page: pageNum, search: String(search) })
      return result
   }
}