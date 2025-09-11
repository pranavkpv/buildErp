import { Request, Response, NextFunction } from 'express';
import { IReceiveController } from '../../domain/Entities/IController/IReceive';
import { commonOutput } from '../../application/dto/common';
import { RecieveOutput } from '../../application/dto/receive.dto';
import { ISaveReceiveUseCase } from '../../application/IUseCases/IReceive/ISaveReceive';
import { IGetReceiveUseCase } from '../../application/IUseCases/IReceive/IGetReceive';
import { IUpdateReceiveUseCase } from '../../application/IUseCases/IReceive/IUpdateRecieve';
import { IDeleteReceiveUseCase } from '../../application/IUseCases/IReceive/IDeleteReceive';
import { IApproveReceiveUseCase } from '../../application/IUseCases/IReceive/IApproveReceive';

type materialData = {
    sl: number
    material_id: string
    material_name: string
    brand_name: string
    unit_name: string
    quantity: number
    unit_rate: number
};


export class ReceiveController implements IReceiveController {
    constructor(
        private _saveReceiveUseCase: ISaveReceiveUseCase,
        private _getReceiveUseCase: IGetReceiveUseCase,
        private _updateReceiveUseCase: IUpdateReceiveUseCase,
        private _deleteReceiveUseCase: IDeleteReceiveUseCase,
        private _approveReceiveUseCase: IApproveReceiveUseCase,
    ) { }

    // Save a new receive entry
    saveReceive = async(req: Request, res: Response, next: NextFunction):
        Promise<commonOutput | void> => {
        try {
            const response = await this._saveReceiveUseCase.execute(req.body);
            return response;
        } catch (error) {
            return next(error);
        }
    };

    // Get receive entries with pagination and search
    getReceive = async(req: Request, res: Response, next: NextFunction):
        Promise<commonOutput<{ data: RecieveOutput[], totalPage: number }> | commonOutput | void> => {
        try {
            const { search, page } = req.query;
            const response = await this._getReceiveUseCase.execute(String(search), Number(page));
            return response;
        } catch (error) {
            return next(error);
        }
    };

    // Update a receive entry by ID
    updateReceive = async(req: Request, res: Response, next: NextFunction):
        Promise<commonOutput | void> => {
        try {
            const _id = req.params.id;
            const response = await this._updateReceiveUseCase.execute({ _id, ...req.body });
            return response;
        } catch (error) {
            return next(error);
        }
    };

    // Delete a receive entry by ID
    deleteReceive = async(req: Request, res: Response, next: NextFunction):
        Promise<commonOutput | void> => {
        try {
            const _id = req.params.id;
            const response = await this._deleteReceiveUseCase.execute(_id);
            return response;
        } catch (error) {
            return next(error);
        }
    };

    // Approve a receive entry
    approveReceive = async(req: Request, res: Response, next: NextFunction): Promise<commonOutput | void> => {
        try {
            const _id = req.params.id;
            const project_id = req.body.data.approveData.project_id;
            const materialDetails = req.body.data.approveData.materialData.map((element: materialData) => ({
                material_id: element.material_id,
                quantity: element.quantity,
                unit_rate: element.unit_rate,
            }));
            const response = await this._approveReceiveUseCase.execute(_id, project_id, materialDetails);
            return response;
        } catch (error) {
            return next(error);
        }
    };
}
