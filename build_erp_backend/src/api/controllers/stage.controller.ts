import { Request, Response, NextFunction } from "express";
import { IStageController } from "../../domain/Entities/ControllerEntities/AdminControllerEntities/IStageControllerEntity";
import { IStageSaveUseCase } from "../../application/interfaces/AdminUseCaseEntities/StageUseCaseEntities/StageSaveEntity";
import { IFetchCostUseCase } from "../../application/interfaces/AdminUseCaseEntities/StageUseCaseEntities/FetchCostEntity";
import { IFetchStageUsecase } from "../../application/interfaces/AdminUseCaseEntities/StageUseCaseEntities/FetchStageEntity";
import { IDeleteStageUseCase } from "../../application/interfaces/AdminUseCaseEntities/StageUseCaseEntities/DeleteStageEntity";
import { IUpdateStageUseCase } from "../../application/interfaces/AdminUseCaseEntities/StageUseCaseEntities/UpdateStageEntity";
import { commonOutput } from "../../application/dto/common";
import { publicstageDTO, stageListDTO } from "../../application/dto/stage.dto";
import { IFetchStatusUseCase } from "../../application/interfaces/SitemanagerUseCaseEntities/StageStatusUpdationUseCaseEntities/IFetchstatus.usecase";




export class StageController implements IStageController {
   constructor(
      private _stagesaveusecase: IStageSaveUseCase,
      private _fetchCostusecase: IFetchCostUseCase,
      private _fetchStageusecase: IFetchStageUsecase,
      private _deletestageusecase: IDeleteStageUseCase,
      private _updateStageUseCase: IUpdateStageUseCase,
      private _fetchStatusUseCase: IFetchStatusUseCase
   ) { }

   //------------------------------------ Display the project with projectId  ------------------------------------//

   fetchCost = async (req: Request, res: Response, next: NextFunction): Promise<commonOutput<number> | commonOutput> => {
      const projectId = req.params.id
      const result = await this._fetchCostusecase.execute(projectId);
      return result
   }

   //------------------------------------Save stage ------------------------------------//

   stageSave = async (req: Request, res: Response, next: NextFunction): Promise<commonOutput> => {
      const result = await this._stagesaveusecase.execute(req.body.data)
      return result
   }

   //------------------------------------ List of all stage with search and pagination------------------------------------//

   fetchStage = async (req: Request, res: Response, next: NextFunction): Promise<commonOutput<{data:stageListDTO[],totalPage:number}> | commonOutput> => {
      const { search, page } = req.query
      const result = await this._fetchStageusecase.execute({page:Number(page),search:String(search)})
      return result
   }

   //------------------------------------ Delete stage  ------------------------------------//


   deleteStage = async (req: Request, res: Response, next: NextFunction): Promise<commonOutput> => {
      const result = await this._deletestageusecase.execute(String(req.params.id))
      return result
   }

   //------------------------------------ Update the stage ------------------------------------//

   updateStage = async (req: Request, res: Response, next: NextFunction): Promise<commonOutput> => {
      const result = await this._updateStageUseCase.execute({ projectId: req.params.id, ...req.body })
      return result
   }

   fetchStageData = async (req: Request, res: Response, next: NextFunction): Promise<commonOutput<publicstageDTO[]>> => {
      const _id = req.params.id
      const result = await this._fetchStatusUseCase.execute(_id)
      return result
   }

}