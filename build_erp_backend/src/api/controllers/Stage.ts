import { Request, Response, NextFunction } from 'express';
import { IStageController } from '../../domain/Entities/IController/IStage';
import { IStageSaveUseCase } from '../../application/IUseCases/IStage/IStageSave';
import { IFetchCostUseCase } from '../../application/IUseCases/IStage/IFetchCost';
import { IFetchStageUsecase } from '../../application/IUseCases/IStage/IFetchStage';
import { IDeleteStageUseCase } from '../../application/IUseCases/IStage/IDeleteStage';
import { IUpdateStageUseCase } from '../../application/IUseCases/IStage/IUpdateStage';
import { commonOutput } from '../../application/dto/common';
import { publicstageDTO, stageListDTO, verifyStageDTO } from '../../application/dto/stage.dto';
import { IFetchStatusUseCase } from '../../application/IUseCases/IStageStatusUpdation/IFetchStageStatus';
import { IPaymentIntendCreationUseCase } from '../../application/IUseCases/IStage/IPaymentIntendCreation';
import { IHandleWebhookUseCase } from '../../application/IUseCases/IStage/IHandlewebhook';
import { IFetchStageForVerifyUseCase } from '../../application/IUseCases/IStage/IFetchStageForVerify';
import { IVerifyPaymentUseCase } from '../../application/IUseCases/IStage/IVerifyPayment';
import { walletDTO } from '../../application/dto/payment.dto';
import { IGetWalletHistoryUseCase } from '../../application/IUseCases/IUserProfile/IGetWalletHistory';
import { ResponseHelper } from '../../Shared/responseHelpers/response';
import { IJwtService } from '../../domain/Entities/Service.Entities/IJwtservice';
import { IWalletPaymentUseCase } from '../../application/IUseCases/IStage/IWalletPayment';


export class StageController implements IStageController {
    constructor(
        private _stageSaveUseCase: IStageSaveUseCase,
        private _fetchCostUseCase: IFetchCostUseCase,
        private _fetchStageUseCase: IFetchStageUsecase,
        private _deleteStageUseCase: IDeleteStageUseCase,
        private _updateStageUseCase: IUpdateStageUseCase,
        private _fetchStatusUseCase: IFetchStatusUseCase,
        private _payIntentCreationUseCase: IPaymentIntendCreationUseCase,
        private _handleWebhookUseCase: IHandleWebhookUseCase,
        private _fetchStageForVerifyUseCase: IFetchStageForVerifyUseCase,
        private _verifyPaymentUseCase: IVerifyPaymentUseCase,
        private _getWalletHistoryUseCase: IGetWalletHistoryUseCase,
        private _jwtservice: IJwtService,
        private _walletPaymentUseCase: IWalletPaymentUseCase
    ) { }

    //  Fetch project cost by projectId
    fetchProjectCost = async (req: Request, res: Response, next: NextFunction):
        Promise<commonOutput<number> | commonOutput | void> => {
        try {
            const projectId = req.params.id;
            const result = await this._fetchCostUseCase.execute(projectId);
            return result;
        } catch (error) {
            next(error);
        }
    };

    //  Save a new stage
    saveStage = async (req: Request, res: Response, next: NextFunction):
        Promise<commonOutput | void> => {
        try {
            const result = await this._stageSaveUseCase.execute(req.body.data);
            return result;
        } catch (error) {
            next(error);
        }
    };

    //  Fetch all stages with search & pagination
    getAllStages = async (req: Request, res: Response, next: NextFunction):
        Promise<commonOutput<{ data: stageListDTO[]; totalPage: number }> | commonOutput | void> => {
        try {
            const { search, page } = req.query;
            const result = await this._fetchStageUseCase.execute({
                page: Number(page),
                search: String(search),
            });
            return result;
        } catch (error) {
            next(error);
        }
    };

    //  Delete stage by stageId
    removeStage = async (req: Request, res: Response, next: NextFunction):
        Promise<commonOutput | void> => {
        try {
            const result = await this._deleteStageUseCase.execute(String(req.params.id));
            return result;
        } catch (error) {
            next(error);
        }
    };

    //  Update an existing stage
    updateStage = async (req: Request, res: Response, next: NextFunction):
        Promise<commonOutput | void> => {
        try {
            const result = await this._updateStageUseCase.execute({
                projectId: req.params.id,
                ...req.body,
            });
            return result;
        } catch (error) {
            next(error);
        }
    };

    //  Fetch stage data with status
    getStageData = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<commonOutput<publicstageDTO[]> | void> => {
        try {
            const stageId = req.params.id;
            const result = await this._fetchStatusUseCase.execute(stageId);
            return result;
        } catch (error) {
            next(error);
        }
    };

    paymentIntendCreation = async (req: Request, res: Response, next: NextFunction):
        Promise<commonOutput<string> | commonOutput | void> => {
        try {
            const { stageId, stageAmount } = req.body;
            const result = await this._payIntentCreationUseCase.execute(stageId, stageAmount);
            return result;
        } catch (error) {
            next(error);
        }
    };
    handleWebhook = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<commonOutput | void> => {
        try {
            const signature = req.headers['stripe-signature'] as string;
            const endpointSecret = process.env.WEBHOOK_SECRET_KEY;
            if (!endpointSecret) {
                return;
            }

            const result = await this._handleWebhookUseCase.execute(
                req.body as Buffer,
                signature,
                endpointSecret,
            );
            return result;
        } catch (error) {
            next(error);
        }
    };
    getStageForVerify = async (req: Request, res: Response, next: NextFunction):
        Promise<commonOutput<{ data: verifyStageDTO[], totalPage: number }> | commonOutput | void> => {
        try {
            const { search, page } = req.query;
            const result = await this._fetchStageForVerifyUseCase.execute({ search: String(search), page: Number(page) });
            return result;
        } catch (error) {
            next(error);
        }
    };
    verifyPayment = async (req: Request, res: Response, next: NextFunction):
        Promise<commonOutput | void> => {
        try {
            const stageId = req.params.id;
            const result = await this._verifyPaymentUseCase.execute(stageId);
            return result;
        } catch (error) {
            next(error);
        }
    };
    getwalletHistory = async (req: Request, res: Response, next: NextFunction):
        Promise<commonOutput<{ data: walletDTO[], totalPage: number }> | commonOutput | void> => {
        try {
            const { page, search } = req.query;
            const userHeader = req.headers.authorization;
            const accessToken = userHeader?.split(' ')[1];
            if (!accessToken) return ResponseHelper.unAuthor();

            const payload = await this._jwtservice.verifyAccessToken(accessToken);
            if (!payload) return ResponseHelper.unAuthor();
            const response = await this._getWalletHistoryUseCase.execute(Number(page), String(search), payload._id);
            return response;
        } catch (error) {
            next(error);
        }
    };
    createWalletPayment = async (req: Request, res: Response, next: NextFunction):
        Promise<commonOutput | void> => {
        const { stageId, stageAmount } = req.body
        const result = await this._walletPaymentUseCase.execute(stageId, stageAmount)
        return result
    }
}
