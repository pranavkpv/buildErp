import { Request, Response, NextFunction } from "express";
import { IFetchCategoryListControllerEntity } from "../../../../Entities/ControllerEntities/Category.Controller.Entities/FetchCategory.Controller.Entity";
import { commonOutput } from "../../../../DTO/CommonEntities/common";
import { IDisplayAllCategoryUseCaseEntity } from "../../../../Entities/useCaseEntities/Category.UseCase.Entities/DisplayAllCategoryEntity";
import { ResponseHelper } from "../../../../Shared/ResponseHelper/response";
import { commonFailedMessage } from "../../../../Shared/Messages/Common.Message";

export class FetchCategoryListController implements IFetchCategoryListControllerEntity {
   constructor(private displayAllCategoryUseCase: IDisplayAllCategoryUseCaseEntity) { }
   categoryListHandler = async (req: Request, res: Response, next: NextFunction): Promise<commonOutput | void> => {
      try {
         const { page, search } = req.query
         // Convert page to number and validate
         const pageNum = Number(page);
         if (isNaN(pageNum) || pageNum <= 0) {
            return ResponseHelper.badRequest(commonFailedMessage.PAGE_NEGATIVE)
         }
         //  limit search query length
         if (search && String(search).length > 50) {
            return ResponseHelper.badRequest(commonFailedMessage.SEARCH_LIMIT)
         }
         const result = await this.displayAllCategoryUseCase.execute(pageNum, String(search))
         return result
      } catch (error) {
         next(error)
      }
   }
}