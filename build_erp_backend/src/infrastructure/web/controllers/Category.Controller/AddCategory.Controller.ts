import { Request, Response, NextFunction } from "express";
import { IAddCategoryControllerEntity } from "../../../../Entities/ControllerEntities/Category.Controller.Entities/AddCategory.Controller.Entity";
import { commonOutput } from "../../../../DTO/CommonEntities/common";
import { ISaveCategoryUseCaseEntity } from "../../../../Entities/useCaseEntities/Category.UseCase.Entities/SaveCategoryEntity";
import { ResponseHelper } from "../../../../Shared/ResponseHelper/response";
import { CategoryFailedMessage } from "../../../../Shared/Messages/Category.Message";
import { specialCharacter } from "../../../../Shared/ConstantValues/Special.constant";
import { zeroToNine } from "../../../../Shared/ConstantValues/Number.constant";

export class AddCategoryController implements IAddCategoryControllerEntity {
   constructor(private addCategoryUseCase: ISaveCategoryUseCaseEntity) { }
   addCategoryHandler = async (req: Request, res: Response, next: NextFunction): Promise<commonOutput | void> => {
      try {
         const { category_name, description } = req.body
         //--------empty category--------//
         if (category_name.trim() == "") {
            return ResponseHelper.badRequest(CategoryFailedMessage.NEED_CATEGORY)
         }
         //--------atleast 3 character should exist--------//
         if (category_name.trim().length < 3) {
            return ResponseHelper.badRequest(CategoryFailedMessage.MIN_SIZE)
         }
         //--------atmost 50 characted exist--------//
         if (category_name.trim().length > 50) {
            return ResponseHelper.badRequest(CategoryFailedMessage.MAX_SIZE);
         }
         //--------Special character shouldn't exist category--------//
         for (let element of specialCharacter) {
            if (category_name.includes(element)) {
               return ResponseHelper.badRequest(CategoryFailedMessage.EXIST_SPECIAL_CHAR)
            }
         }
         //--------Number shouldn't exist category--------//
         for (let number of zeroToNine) {
            if (category_name.includes(String(number))) {
               return ResponseHelper.badRequest(CategoryFailedMessage.EXIST_NUMBER)
            }
         }
         const result = await this.addCategoryUseCase.execute(req.body)
         return result
      } catch (error) {
         next(error)
      }
   }
}