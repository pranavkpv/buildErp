import { Request, Response, NextFunction } from "express";
import { IEditCategoryControllerEntity } from "../../../../Entities/ControllerEntities/Category.Controller.Entities/EditCategory.Controller.Entity";
import { commonOutput } from "../../../../DTO/CommonEntities/common";
import { IUpdateCategoryUseCaseEntity } from "../../../../Entities/useCaseEntities/Category.UseCase.Entities/UpdateCategoryEntity";
import { ResponseHelper } from "../../../../Shared/ResponseHelper/response";
import { CategoryFailedMessage } from "../../../../Shared/Messages/Category.Message";
import { specialCharacter } from "../../../../Shared/ConstantValues/Special.constant";
import { zeroToNine } from "../../../../Shared/ConstantValues/Number.constant";

export class EditCategoryController implements IEditCategoryControllerEntity {
   constructor(private editcategoryUseCase: IUpdateCategoryUseCaseEntity) { }
   editCategoryHandler = async (req: Request, res: Response, next: NextFunction): Promise<commonOutput | void> => {
      try {
         const _id = req.params.id
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
         const result = await this.editcategoryUseCase.execute({ _id, ...req.body })
         return result
      } catch (error) {
         next(error)
      }
   }
}