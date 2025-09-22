import { Request, Response, NextFunction } from 'express';
import { ITransferController } from '../../domain/Entities/IController/ITransfer';
import { ResponseHelper } from '../../Shared/responseHelpers/response';
import { IJwtService } from '../../domain/Entities/Service.Entities/IJwtservice';
import { commonOutput } from '../../application/dto/common';
import { listTransferDTO, projectStockListDTO, TransferOutput } from '../../application/dto/transfer.dto';
import { fetchProjectIdnameDTO } from '../../application/dto/project.dto';
import { IGetTransferUseCase } from '../../application/IUseCases/ITransfer/IGetTransfer';
import { IGetToProjectUseCase } from '../../application/IUseCases/ITransfer/IGetToProject';
import { ISaveTransferUseCase } from '../../application/IUseCases/ITransfer/ISaveTransfer';
import { IUpdateTransferUseCase } from '../../application/IUseCases/ITransfer/IUpdateTransfer';
import { IDeleteTransferUseCase } from '../../application/IUseCases/ITransfer/IDeleteTransfer';
import { IApproveTransferUseCase } from '../../application/IUseCases/ITransfer/IApproveTransfer';
import { IReceiveTransferUseCase } from '../../application/IUseCases/ITransfer/IReceiveTransfer';
import { IFetchStockListUseCase } from '../../application/IUseCases/ITransfer/IFetchStockList';
import { IGetUserBaseTransferUseCase } from '../../application/IUseCases/ITransfer/IGetUserBaseTransfer';
import { IRejectTransferUsecase } from '../../application/IUseCases/ITransfer/IRejectTransfer';

export class TransferController implements ITransferController {

    constructor(
        private _jwtService: IJwtService,
        private _getTransferUseCase: IGetTransferUseCase,
        private _getToProjectUseCase: IGetToProjectUseCase,
        private _saveTransferUseCase: ISaveTransferUseCase,
        private _updateTransferUseCase: IUpdateTransferUseCase,
        private _deleteTransferUseCase: IDeleteTransferUseCase,
        private _approveTransferUseCase: IApproveTransferUseCase,
        private _receiveTransferUseCase: IReceiveTransferUseCase,
        private _fetchStockListUseCase: IFetchStockListUseCase,
        private _getUserBaseTransferUseCase: IGetUserBaseTransferUseCase,
        private _rejectTransferUseCase: IRejectTransferUsecase,
    ) { }

    //  Fetch transfer list with pagination & search 
    fetchTransfers = async(req: Request, res: Response, next: NextFunction):
        Promise<commonOutput<{ data: listTransferDTO[], totalPage: number }> | commonOutput | void> => {
        try {
            const { search, page } = req.query;
            const userHeader = req.headers.authorization;
            const accessToken = userHeader?.split(' ')[1];

            if (!accessToken) return ResponseHelper.unAuthor();

            const payload = await this._jwtService.verifyAccessToken(accessToken);
            if (!payload) return ResponseHelper.unAuthor();

            const data = await this._getTransferUseCase.execute(String(search), Number(page), payload._id);
            return data;
        } catch (error) {
            next(error);
        }
    };

    // Fetch projects available for transfer 
    fetchToProjects = async(req: Request, res: Response, next: NextFunction):
        Promise<commonOutput<fetchProjectIdnameDTO[]> | commonOutput | void> => {
        try {
            const fromProjectId = req.params.id;
            const data = await this._getToProjectUseCase.execute(fromProjectId);
            return data;
        } catch (error) {
            next(error);
        }
    };

    //  Save a new transfer request
    createTransfer = async(req: Request, res: Response, next: NextFunction):
        Promise<commonOutput | void> => {
        try {
            const response = await this._saveTransferUseCase.execute(req.body);
            return response;
        } catch (error) {
            next(error);
        }
    };

    //  Update transfer request 
    updateTransfer = async(req: Request, res: Response, next: NextFunction):
        Promise<commonOutput | void> => {
        try {
            const _id = req.params.id;
            const response = await this._updateTransferUseCase.execute({ _id, ...req.body });
            return response;
        } catch (error) {
            next(error);
        }
    };

    //  Delete a transfer request 
    removeTransfer = async(req: Request, res: Response, next: NextFunction):
        Promise<commonOutput | void> => {
        try {
            const _id = req.params.id;
            const response = await this._deleteTransferUseCase.execute(_id);
            return response;
        } catch (error) {
            next(error);
        }
    };

    //  Approve transfer request 
    approveTransfer = async(req: Request, res: Response, next: NextFunction):
        Promise<commonOutput | void> => {
        try {
            const _id = req.params.id;
            const response = await this._approveTransferUseCase.execute({ _id, ...req.body.data });
            return response;
        } catch (error) {
            next(error);
        }
    };

    //  Receive transferred materials 
    receiveTransfer = async(req: Request, res: Response, next: NextFunction):
        Promise<commonOutput<TransferOutput[]> | commonOutput | void> => {
        try {
            const _id = req.params.id;
            const date = req.query.date;
            const data = await this._receiveTransferUseCase.execute(_id, String(date));
            return data;
        } catch (error) {
            next(error);
        }
    };
    fullStockList = async(req: Request, res: Response, next: NextFunction):
        Promise<commonOutput<projectStockListDTO[]> | void> => {
        try {
            const projectId = req.params.id;
            const data = await this._fetchStockListUseCase.execute(projectId);
            return data;
        } catch (error) {
            next(error);
        }
    };
    getUserBaseTransfer = async(req: Request, res: Response, next: NextFunction):
        Promise<commonOutput<listTransferDTO[]> | commonOutput | void> => {
        try {
            const userHeader = req.headers.authorization;
            const accessToken = userHeader?.split(' ')[1];
            if (!accessToken) return ResponseHelper.unAuthor();

            const payload = await this._jwtService.verifyAccessToken(accessToken);
            if (!payload) return ResponseHelper.unAuthor();
            const data = await this._getUserBaseTransferUseCase.execute(payload._id);
            return data;
        } catch (error) {
            next(error);
        }
    };
    rejectTransferById = async(req: Request, res: Response, next: NextFunction):
        Promise<commonOutput | void> => {
        try {
            const transferId = req.params.id;
            const data = await this._rejectTransferUseCase.execute(transferId);
            return data;
        } catch (error) {
            next(error);
        }
    };
}
