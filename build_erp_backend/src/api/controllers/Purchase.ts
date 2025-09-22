import { NextFunction, Request, Response } from 'express';
import { IPurchaseController } from '../../domain/Entities/IController/IPurchase';
import { ResponseHelper } from '../../Shared/responseHelpers/response';
import { IJwtService } from '../../domain/Entities/Service.Entities/IJwtservice';
import { commonOutput } from '../../application/dto/common';
import { PurchaseDTO } from '../../application/dto/purchase.dto';
import { IGetPurchaseUseCase } from '../../application/IUseCases/IPurchase/IGetPurchase';
import { ISavePurchaseUseCase } from '../../application/IUseCases/IPurchase/ISavePurchase';
import { IUpdatePurchaseUseCase } from '../../application/IUseCases/IPurchase/IUpdatePurchase';
import { IDeletePurchaseUseCase } from '../../application/IUseCases/IPurchase/IDeletePurchase';
import { IApprovePurchaseUseCase } from '../../application/IUseCases/IPurchase/IApprovePurchase';
import { IGetLastInvoiceUsecase } from '../../application/IUseCases/IPurchase/IGetLastInvoice';

export class PurchaseController implements IPurchaseController {
    constructor(
      private _getPurchaseUsecase: IGetPurchaseUseCase,
      private _savePurchaseUseCase: ISavePurchaseUseCase,
      private _jwtService: IJwtService,
      private _updatePurchaseUseCase: IUpdatePurchaseUseCase,
      private _deletePurchaseUseCase: IDeletePurchaseUseCase,
      private _approvePurchaseUseCase: IApprovePurchaseUseCase,
      private _getLastInvoiceUseCase: IGetLastInvoiceUsecase,
    ) { }

    // Fetch purchases with search and pagination
    getPurchases = async(req: Request, res: Response, next: NextFunction):
      Promise<commonOutput<{ data: PurchaseDTO[], totalPage: number }> | commonOutput | void> => {
        try {
            const { search, page } = req.query;
            const userHeader = req.headers.authorization;
            const accessToken = userHeader?.split(' ')[1];

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
                payload._id,
            );
            return data;
        } catch (error) {
            next(error);
        }
    };

    // Save a new purchase
    savePurchase = async(req: Request, res: Response, next: NextFunction):
      Promise<commonOutput | void> => {
        try {
            const result = await this._savePurchaseUseCase.execute(req.body);
            return result;
        } catch (error) {
            next(error);
        }
    };

    // Update purchase by ID
    updatePurchase = async(req: Request, res: Response, next: NextFunction):
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
    deletePurchase = async(req: Request, res: Response, next: NextFunction):
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
    approvePurchase = async(req: Request, res: Response, next: NextFunction):
      Promise<commonOutput | void> => {
        try {
            const _id = req.params.id;
            const result = await this._approvePurchaseUseCase.execute({ _id, ...req.body.data });
            return result;
        } catch (error) {
            next(error);
        }
    };
    getLastInvoice = async(req: Request, res: Response, next: NextFunction): 
    Promise<commonOutput<number> | void> =>{
        try {
            const result = await this._getLastInvoiceUseCase.execute();
            return result;
        } catch (error) {
            next(error);
        }
    };
}
