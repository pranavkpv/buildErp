import { NextFunction, Request, Response } from "express";
import { IPurchaseControllerEntity } from "../../../../Entities/ControllerEntities/SitemanagerControllerEntities/IPurchaseControllerEntity";
import { commonOutput } from "../../../../Entities/Input-OutputEntities/CommonEntities/common";
import { purchaseOutput } from "../../../../Entities/Input-OutputEntities/PurchaseEntity.ts/Purchase";
import { IGetPurchaseUseCase } from "../../../../Entities/useCaseEntities/SitemanagerUseCaseEntities/PurchaseUseCaseEntities/GetPurchaseUseCaseEntity";
import { ISavePurchaseUseCase } from "../../../../Entities/useCaseEntities/SitemanagerUseCaseEntities/PurchaseUseCaseEntities/SavePurchaseUseCaseEntity";
import { JwtServiceImpl } from "../../../../services/JwtService";
import { ERROR_MESSAGE } from "../../../../Shared/Message";
import { HTTP_STATUS } from "../../../../Shared/Status_code";
import { IUpdatePurchaseUseCase } from "../../../../Entities/useCaseEntities/SitemanagerUseCaseEntities/PurchaseUseCaseEntities/UpdatePurchaseUseCaseEntity";
import { IDeletePurchaseUseCase } from "../../../../Entities/useCaseEntities/SitemanagerUseCaseEntities/PurchaseUseCaseEntities/DeletePurchaseUseCaseEntity";
import { IApprovePurchaseUseCase } from "../../../../Entities/useCaseEntities/SitemanagerUseCaseEntities/PurchaseUseCaseEntities/ApprovePurchaseUseCaseEntitty";

export class PurchaseController implements IPurchaseControllerEntity {
   private getPurchaseUsecase: IGetPurchaseUseCase
   private savePurchaseUseCase: ISavePurchaseUseCase
   private jwtService: JwtServiceImpl
   private updatePurchaseUseCase: IUpdatePurchaseUseCase
   private DeletePurchasaeUseCase: IDeletePurchaseUseCase
   private approvePurchaseUseCase : IApprovePurchaseUseCase
   constructor(getPurchaseUsecase: IGetPurchaseUseCase, savePurchaseUseCase: ISavePurchaseUseCase,
      jwtService: JwtServiceImpl, updatePurchaseUseCase: IUpdatePurchaseUseCase,
      DeletePurchasaeUseCase: IDeletePurchaseUseCase,
      approvePurchaseUseCase : IApprovePurchaseUseCase
   ) {
      this.getPurchaseUsecase = getPurchaseUsecase
      this.savePurchaseUseCase = savePurchaseUseCase
      this.jwtService = jwtService
      this.updatePurchaseUseCase = updatePurchaseUseCase
      this.DeletePurchasaeUseCase = DeletePurchasaeUseCase
      this.approvePurchaseUseCase = approvePurchaseUseCase
   }
   getpurchase = async (req: Request, res: Response, next: NextFunction): Promise<purchaseOutput | commonOutput> => {
      const { search, page } = req.query
      const refreshToken = req.cookies.refreshToken
      const decoded = await this.jwtService.verifyRefreshToken(refreshToken)
      if (!decoded?.userId) {
         return {
            success: false,
            message: ERROR_MESSAGE.USER.USER_NOT_FOUND,
            status_code: HTTP_STATUS.UNAUTHORIZED
         }
      }
      const data = await this.getPurchaseUsecase.execute(String(search), Number(page), decoded?.userId)
      return data
   }
   savePurchase = async (req: Request, res: Response, next: NextFunction): Promise<commonOutput> => {
      const result = await this.savePurchaseUseCase.execute(req.body)
      return result
   }
   updatePurchase = async (req: Request, res: Response, next: NextFunction): Promise<commonOutput> => {
      const _id = req.params.id
      const result = await this.updatePurchaseUseCase.execute({ _id, ...req.body })
      return result
   }
   deletePurchase = async (req: Request, res: Response, next: NextFunction): Promise<commonOutput> => {
      const _id = req.params.id
      const result = await this.DeletePurchasaeUseCase.execute(_id)
      return result
   }
   approvePurchase = async (req: Request, res: Response, next: NextFunction): Promise<commonOutput> => {
      const _id = req.params.id
      const result = await this.approvePurchaseUseCase.execute(_id)
      return result
   }
}