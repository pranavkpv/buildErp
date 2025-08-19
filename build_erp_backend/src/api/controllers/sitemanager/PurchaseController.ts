import { NextFunction, Request, Response } from "express";
import { IPurchaseControllerEntity } from "../../../domain/Entities/ControllerEntities/SitemanagerControllerEntities/IPurchaseControllerEntity";
import { commonOutput } from "../../../application/dto/CommonEntities/common";
import { purchaseOutput } from "../../../application/dto/PurchaseEntity.ts/Purchase";
import { IGetPurchaseUseCaseEntity } from "../../../application/interfaces/SitemanagerUseCaseEntities/PurchaseUseCaseEntities/GetPurchaseUseCaseEntity";
import { ISavePurchaseUseCaseEntity } from "../../../application/interfaces/SitemanagerUseCaseEntities/PurchaseUseCaseEntities/SavePurchaseUseCaseEntity";
import { IUpdatePurchaseUseCaseEntity } from "../../../application/interfaces/SitemanagerUseCaseEntities/PurchaseUseCaseEntities/UpdatePurchaseUseCaseEntity";
import { IDeletePurchaseUseCaseEntity } from "../../../application/interfaces/SitemanagerUseCaseEntities/PurchaseUseCaseEntities/DeletePurchaseUseCaseEntity";
import { IApprovePurchaseUseCaseEntity } from "../../../application/interfaces/SitemanagerUseCaseEntities/PurchaseUseCaseEntities/ApprovePurchaseUseCaseEntitty";
import { IJwtServiceEntity } from "../../../domain/Entities/Service.Entities/IJwtservice";
import { ResponseHelper } from "../../../Shared/responseHelpers/response";
import { userFailedMessage } from "../../../Shared/Messages/User.Message";

export class PurchaseController implements IPurchaseControllerEntity {
   private getPurchaseUsecase: IGetPurchaseUseCaseEntity
   private savePurchaseUseCase: ISavePurchaseUseCaseEntity
   private jwtService: IJwtServiceEntity
   private updatePurchaseUseCase: IUpdatePurchaseUseCaseEntity
   private DeletePurchasaeUseCase: IDeletePurchaseUseCaseEntity
   private approvePurchaseUseCase : IApprovePurchaseUseCaseEntity
   constructor(getPurchaseUsecase: IGetPurchaseUseCaseEntity, savePurchaseUseCase: ISavePurchaseUseCaseEntity,
      jwtService: IJwtServiceEntity, updatePurchaseUseCase: IUpdatePurchaseUseCaseEntity,
      DeletePurchasaeUseCase: IDeletePurchaseUseCaseEntity,
      approvePurchaseUseCase : IApprovePurchaseUseCaseEntity
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
         return ResponseHelper.conflictData(userFailedMessage.USER_NOT_FOUND)
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
      const result = await this.approvePurchaseUseCase.execute({_id,...req.body.data})
      return result
   }
}