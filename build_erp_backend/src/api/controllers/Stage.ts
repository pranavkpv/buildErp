import { Request, Response, NextFunction } from 'express';
import { IStageController } from '../../domain/Entities/IController/IStage';
import { IStageSaveUseCase } from '../../application/IUseCases/IStage/IStageSave';
import { IFetchCostUseCase } from '../../application/IUseCases/IStage/IFetchCost';
import { IFetchStageUsecase } from '../../application/IUseCases/IStage/IFetchStage';
import { IDeleteStageUseCase } from '../../application/IUseCases/IStage/IDeleteStage';
import { IUpdateStageUseCase } from '../../application/IUseCases/IStage/IUpdateStage';
import { commonOutput } from '../../application/dto/common';
import { publicstageDTO, stageListDTO } from '../../application/dto/stage.dto';
import { IFetchStatusUseCase } from '../../application/IUseCases/IStageStatusUpdation/IFetchStageStatus';

export class StageController implements IStageController {
    constructor(
      private _stageSaveUseCase: IStageSaveUseCase,
      private _fetchCostUseCase: IFetchCostUseCase,
      private _fetchStageUseCase: IFetchStageUsecase,
      private _deleteStageUseCase: IDeleteStageUseCase,
      private _updateStageUseCase: IUpdateStageUseCase,
      private _fetchStatusUseCase: IFetchStatusUseCase,
    ) { }

    //  Fetch project cost by projectId
    fetchProjectCost = async(req: Request, res: Response, next: NextFunction):
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
    saveStage = async(req: Request, res: Response, next: NextFunction):
      Promise<commonOutput | void> => {
        try {
            const result = await this._stageSaveUseCase.execute(req.body.data);
            return result;
        } catch (error) {
            next(error);
        }
    };

    //  Fetch all stages with search & pagination
    getAllStages = async(req: Request, res: Response, next: NextFunction):
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
    removeStage = async(req: Request, res: Response, next: NextFunction):
      Promise<commonOutput | void> => {
        try {
            const result = await this._deleteStageUseCase.execute(String(req.params.id));
            return result;
        } catch (error) {
            next(error);
        }
    };

    //  Update an existing stage
    updateStage = async(req: Request, res: Response, next: NextFunction):
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
    getStageData = async(
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
}
