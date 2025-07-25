import { Request, Response, NextFunction } from "express";
import { IStageControllerEntity } from "../../../../Entities/ControllerEntities/AdminControllerEntities/IStageControllerEntity";
import { IStageSaveUseCase } from "../../../../Entities/useCaseEntities/AdminUseCaseEntities/StageUseCaseEntities/StageSaveEntity";
import { IFetchCostUseCase } from "../../../../Entities/useCaseEntities/AdminUseCaseEntities/StageUseCaseEntities/FetchCostEntity";
import { IFetchStageUsecase } from "../../../../Entities/useCaseEntities/AdminUseCaseEntities/StageUseCaseEntities/FetchStageEntity";
import { IDeleteStageUseCase } from "../../../../Entities/useCaseEntities/AdminUseCaseEntities/StageUseCaseEntities/DeleteStageEntity";
import { IUpdateStageUseCase } from "../../../../Entities/useCaseEntities/AdminUseCaseEntities/StageUseCaseEntities/UpdateStageEntity";
import { HTTP_STATUS } from "../../../../Shared/Status_code";


export class StageController implements IStageControllerEntity {
   private stagesaveusecase: IStageSaveUseCase
   private fetchCostusecase: IFetchCostUseCase
   private fetchStageusecase: IFetchStageUsecase
   private deletestageusecase: IDeleteStageUseCase
   private updateStageUseCase: IUpdateStageUseCase
   constructor(fetchCostusecase: IFetchCostUseCase, stagesaveusecase: IStageSaveUseCase,
      fetchStageusecase: IFetchStageUsecase, deletestageusecase: IDeleteStageUseCase, updateStageUseCase: IUpdateStageUseCase) {
      this.fetchCostusecase = fetchCostusecase
      this.stagesaveusecase = stagesaveusecase
      this.fetchStageusecase = fetchStageusecase
      this.deletestageusecase = deletestageusecase
      this.updateStageUseCase = updateStageUseCase
   }


   fetchCost = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      const projectId = req.params.id
      const result = await this.fetchCostusecase.execute({ projectId });
      res.status(result.status_code).json(result);
   }


   stageSave = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      const result = await this.stagesaveusecase.execute(req.body.data)
      res.status(result.status_code).json(result);
   }


   fetchStage = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      const { search, page } = req.query
      const result = await this.fetchStageusecase.execute(String(search), Number(page))
      res.status(HTTP_STATUS.OK).json(result);
   }


   deleteStage = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      const result = await this.deletestageusecase.execute(req.body)
      res.status(result.status_code).json(result);
   }


   updateStage = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      const result = await this.updateStageUseCase.execute({ projectId: req.params.id, ...req.body })
      res.status(result.status_code).json(result);
   }

}