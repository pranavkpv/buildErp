import { NextFunction, Request, Response } from "express"
import { ICategoryControllerEntity } from "../../../../Entities/ControllerEntities/AdminControllerEntities/ICategoryControllerEntity"
import { IDisplayAllCategoryUseCase } from "../../../../Entities/useCaseEntities/AdminUseCaseEntities/CategoryUseCaseEntities/DisplayAllCategoryEntity"
import { ISaveCategoryUseCase } from "../../../../Entities/useCaseEntities/AdminUseCaseEntities/CategoryUseCaseEntities/SaveCategoryEntity"
import { IUpdateCategoryUseCase } from "../../../../Entities/useCaseEntities/AdminUseCaseEntities/CategoryUseCaseEntities/UpdateCategoryEntity"
import { IDeleteCategoryUseCase } from "../../../../Entities/useCaseEntities/AdminUseCaseEntities/CategoryUseCaseEntities/DeleteCategoryEntity"
import { commonOutput } from "../../../../Entities/Input-OutputEntities/CommonEntities/common"



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

   //------------------------------------ List category data with search and pagination ------------------------------------//

   categoryList = async (req: Request, res: Response, next: NextFunction): Promise<{ getCategoryData: any[]; totalPage: number } | commonOutput> => {
      const { page, search } = req.query
      const result = await this.displayAllCategoryUseCase.execute(Number(page), String(search))
      return result
   }

   //------------------------------------ Save category ------------------------------------//

   addCategory = async (req: Request, res: Response, next: NextFunction): Promise<commonOutput> => {
      const result = await this.addCategoryUseCase.execute(req.body)
      return result
   }

   //------------------------------------ Update category ------------------------------------//

   editCategory = async (req: Request, res: Response, next: NextFunction): Promise<commonOutput> => {
      const result = await this.editcategoryUseCase.execute({ _id: req.params.id, ...req.body })
      return result
   }

   //------------------------------------ Delete category ------------------------------------//

   deleteCategory = async (req: Request, res: Response, next: NextFunction):  Promise<commonOutput> => {
      const result = await this.deleteCategoryUseCase.execute(req.params.id)
     return result
   }

}






