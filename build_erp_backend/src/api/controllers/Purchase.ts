import { NextFunction, Request, Response } from "express";
import { IPurchaseController } from "../../domain/Entities/Controller.Entity/IPurchase";
import { IGetPurchaseUseCaseEntity } from "../../application/interfaces/SitemanagerUseCaseEntities/PurchaseUseCaseEntities/GetPurchaseUseCaseEntity";
import { ISavePurchaseUseCaseEntity } from "../../application/interfaces/SitemanagerUseCaseEntities/PurchaseUseCaseEntities/SavePurchaseUseCaseEntity";
import { IUpdatePurchaseUseCaseEntity } from "../../application/interfaces/SitemanagerUseCaseEntities/PurchaseUseCaseEntities/UpdatePurchaseUseCaseEntity";
import { IDeletePurchaseUseCaseEntity } from "../../application/interfaces/SitemanagerUseCaseEntities/PurchaseUseCaseEntities/DeletePurchaseUseCaseEntity";
import { IApprovePurchaseUseCaseEntity } from "../../application/interfaces/SitemanagerUseCaseEntities/PurchaseUseCaseEntities/ApprovePurchaseUseCaseEntitty";
import { ResponseHelper } from "../../Shared/responseHelpers/response";
import { IJwtService } from "../../domain/Entities/Service.Entities/IJwtservice";
import { commonOutput } from "../../application/dto/common";
import { PurchaseDTO } from "../../application/dto/purchase.dto";

export class PurchaseController implements IPurchaseController {
   constructor(
      private _getPurchaseUsecase: IGetPurchaseUseCaseEntity,
      private _savePurchaseUseCase: ISavePurchaseUseCaseEntity,
      private _jwtService: IJwtService,
      private _updatePurchaseUseCase: IUpdatePurchaseUseCaseEntity,
      private _deletePurchaseUseCase: IDeletePurchaseUseCaseEntity,
      private _approvePurchaseUseCase: IApprovePurchaseUseCaseEntity
   ) { }

   // Fetch purchases with search and pagination
   getPurchases = async (req: Request, res: Response, next: NextFunction):
      Promise<commonOutput<{ data: PurchaseDTO[], totalPage: number }> | commonOutput | void> => {
      try {
         const { search, page } = req.query;
         const userHeader = req.headers.authorization;
         const accessToken = userHeader?.split(" ")[1];

         if (!accessToken) {
            return ResponseHelper.unAuthor();
         }

         const payload = await this._jwtService.verifyAccessToken(accessToken);
         if (!payload) {
            return ResponseHelper.unAuthor();
         }

         const data = await this._getPurchaseUsecase.execute(
            String(search),
            Number(page),
            payload._id
         );
         return data;
      } catch (error) {
         next(error);
      }
   };

   // Save a new purchase
   savePurchase = async (req: Request, res: Response, next: NextFunction):
      Promise<commonOutput | void> => {
      try {
         const result = await this._savePurchaseUseCase.execute(req.body);
         return result;
      } catch (error) {
         next(error);
      }
   };

   // Update purchase by ID
   updatePurchase = async (req: Request, res: Response, next: NextFunction):
      Promise<commonOutput | void> => {
      try {
         const _id = req.params.id;
         const result = await this._updatePurchaseUseCase.execute({ _id, ...req.body });
         return result;
      } catch (error) {
         next(error);
      }
   };

   // Delete purchase by ID
   deletePurchase = async (req: Request, res: Response, next: NextFunction):
      Promise<commonOutput | void> => {
      try {
         const _id = req.params.id;
         const result = await this._deletePurchaseUseCase.execute(_id);
         return result;
      } catch (error) {
         next(error);
      }
   };

   // Approve purchase by ID
   approvePurchase = async (req: Request, res: Response, next: NextFunction):
      Promise<commonOutput | void> => {
      try {
         const _id = req.params.id;
         const result = await this._approvePurchaseUseCase.execute({ _id, ...req.body.data });
         return result;
      } catch (error) {
         next(error);
      }
   };
}
