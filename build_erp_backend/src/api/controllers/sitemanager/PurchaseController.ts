import { NextFunction, Request, Response } from "express";
import { IPurchaseControllerEntity } from "../../../domain/Entities/ControllerEntities/SitemanagerControllerEntities/IPurchaseControllerEntity";
import { IGetPurchaseUseCaseEntity } from "../../../application/interfaces/SitemanagerUseCaseEntities/PurchaseUseCaseEntities/GetPurchaseUseCaseEntity";
import { ISavePurchaseUseCaseEntity } from "../../../application/interfaces/SitemanagerUseCaseEntities/PurchaseUseCaseEntities/SavePurchaseUseCaseEntity";
import { IUpdatePurchaseUseCaseEntity } from "../../../application/interfaces/SitemanagerUseCaseEntities/PurchaseUseCaseEntities/UpdatePurchaseUseCaseEntity";
import { IDeletePurchaseUseCaseEntity } from "../../../application/interfaces/SitemanagerUseCaseEntities/PurchaseUseCaseEntities/DeletePurchaseUseCaseEntity";
import { IApprovePurchaseUseCaseEntity } from "../../../application/interfaces/SitemanagerUseCaseEntities/PurchaseUseCaseEntities/ApprovePurchaseUseCaseEntitty";
import { ResponseHelper } from "../../../Shared/responseHelpers/response";
import { IJwtService } from "../../../domain/Entities/Service.Entities/IJwtservice";
import { commonOutput } from "../../../application/dto/common";
import { PurchaseDTO } from "../../../application/dto/purchase.dto";

export class PurchaseController implements IPurchaseControllerEntity {
   constructor(
      private getPurchaseUsecase: IGetPurchaseUseCaseEntity,
      private savePurchaseUseCase: ISavePurchaseUseCaseEntity,
      private jwtService: IJwtService,
      private updatePurchaseUseCase: IUpdatePurchaseUseCaseEntity,
      private DeletePurchasaeUseCase: IDeletePurchaseUseCaseEntity,
      private approvePurchaseUseCase: IApprovePurchaseUseCaseEntity
   ) {
      this.getPurchaseUsecase = getPurchaseUsecase
      this.savePurchaseUseCase = savePurchaseUseCase
      this.jwtService = jwtService
      this.updatePurchaseUseCase = updatePurchaseUseCase
      this.DeletePurchasaeUseCase = DeletePurchasaeUseCase
      this.approvePurchaseUseCase = approvePurchaseUseCase
   }
   getpurchase = async (req: Request, res: Response, next: NextFunction): Promise<commonOutput<{data:PurchaseDTO[],totalPage:number}> | commonOutput> => {
      const { search, page } = req.query
      const userHeader = req.headers.authorization
      const accessToken = userHeader?.split(" ")[1]
      if (!accessToken) {
         return ResponseHelper.unAuthor()
      }
      const payload = await this.jwtService.verifyAccessToken(accessToken);
      if (!payload) {
         return ResponseHelper.unAuthor()
      }
      const data = await this.getPurchaseUsecase.execute(String(search), Number(page), payload._id)
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
      const result = await this.approvePurchaseUseCase.execute({ _id, ...req.body.data })
      return result
   }
}