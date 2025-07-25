import { NextFunction, Request, Response } from "express"
import { ICategoryControllerEntity } from "../../../../Entities/ControllerEntities/AdminControllerEntities/ICategoryControllerEntity"
import { IDisplayAllCategoryUseCase } from "../../../../Entities/useCaseEntities/AdminUseCaseEntities/CategoryUseCaseEntities/DisplayAllCategoryEntity"
import { ISaveCategoryUseCase } from "../../../../Entities/useCaseEntities/AdminUseCaseEntities/CategoryUseCaseEntities/SaveCategoryEntity"
import { IUpdateCategoryUseCase } from "../../../../Entities/useCaseEntities/AdminUseCaseEntities/CategoryUseCaseEntities/UpdateCategoryEntity"
import { IDeleteCategoryUseCase } from "../../../../Entities/useCaseEntities/AdminUseCaseEntities/CategoryUseCaseEntities/DeleteCategoryEntity"
import { HTTP_STATUS } from "../../../../Shared/Status_code"



export class CategoryController implements ICategoryControllerEntity {
   private displayAllCategoryUseCase: IDisplayAllCategoryUseCase
   private addCategoryUseCase: ISaveCategoryUseCase
   private editcategoryUseCase: IUpdateCategoryUseCase
   private deleteCategoryUseCase: IDeleteCategoryUseCase
   constructor(displayAllCategoryUseCase: IDisplayAllCategoryUseCase, addCategoryUseCase: ISaveCategoryUseCase,
      editcategoryUseCase: IUpdateCategoryUseCase, deleteCategoryUseCase: IDeleteCategoryUseCase) {
      this.displayAllCategoryUseCase = displayAllCategoryUseCase
      this.addCategoryUseCase = addCategoryUseCase
      this.editcategoryUseCase = editcategoryUseCase
      this.deleteCategoryUseCase = deleteCategoryUseCase
   }

   categoryList = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      const { page, search } = req.query
      const result = await this.displayAllCategoryUseCase.execute(Number(page), String(search))
      res.status(HTTP_STATUS.OK).json(result)
   }


   addCategory = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      const result = await this.addCategoryUseCase.execute(req.body)
      res.status(result.status_code).json(result)
   }


   editCategory = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      const result = await this.editcategoryUseCase.execute({ _id: req.params.id, ...req.body })
      res.status(result.status_code).json(result)
   }


   deleteCategory = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      const result = await this.deleteCategoryUseCase.execute(req.params.id)
      res.status(result.status_code).json(result)
   }

}






