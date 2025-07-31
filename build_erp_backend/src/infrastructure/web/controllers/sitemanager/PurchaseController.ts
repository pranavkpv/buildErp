import { NextFunction, Request, Response } from "express";
import { IPurchaseControllerEntity } from "../../../../Entities/ControllerEntities/SitemanagerControllerEntities/IPurchaseControllerEntity";
import { commonOutput } from "../../../../Entities/Input-OutputEntities/CommonEntities/common";
import { purchaseOutput } from "../../../../Entities/Input-OutputEntities/PurchaseEntity.ts/Purchase";
import { IGetPurchaseUseCase } from "../../../../Entities/useCaseEntities/SitemanagerUseCaseEntities/PurchaseUseCaseEntities/GetPurchaseUseCaseEntity";
import { ISavePurchaseUseCase } from "../../../../Entities/useCaseEntities/SitemanagerUseCaseEntities/PurchaseUseCaseEntities/SavePurchaseUseCaseEntity";
import { JwtServiceImpl } from "../../../../services/JwtService";
import { ERROR_MESSAGE } from "../../../../Shared/Message";
import { HTTP_STATUS } from "../../../../Shared/Status_code";

export class PurchaseController implements IPurchaseControllerEntity {
   private getPurchaseUsecase: IGetPurchaseUseCase
   private savePurchaseUseCase: ISavePurchaseUseCase
   private jwtService: JwtServiceImpl
   constructor(getPurchaseUsecase: IGetPurchaseUseCase, savePurchaseUseCase: ISavePurchaseUseCase,
      jwtService: JwtServiceImpl
   ) {
      this.getPurchaseUsecase = getPurchaseUsecase
      this.savePurchaseUseCase = savePurchaseUseCase
      this.jwtService = jwtService
   }
   getpurchase = async (req: Request, res: Response, next: NextFunction): Promise<purchaseOutput | commonOutput> => {
      const { search, page } = req.query
      const refreshToken = req.cookies.refreshToken
      const decoded = await this.jwtService.verifyRefreshToken(refreshToken)
      if(!decoded?.userId){
         return {
            success:false,
            message:ERROR_MESSAGE.USER.USER_NOT_FOUND,
            status_code:HTTP_STATUS.UNAUTHORIZED
         }
      }
      const data = await this.getPurchaseUsecase.execute(String(search), Number(page), decoded?.userId)
      return data
   }
   savePurchase = async (req: Request, res: Response, next: NextFunction): Promise<commonOutput> => {
      const result = await this.savePurchaseUseCase.execute(req.body)
      return result
   }
}