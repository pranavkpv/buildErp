import { Request, Response, NextFunction } from "express";
import { IStageControllerEntity } from "../../../../Entities/ControllerEntities/AdminControllerEntities/IStageControllerEntity";
import { IStageSaveUseCase } from "../../../../Entities/useCaseEntities/AdminUseCaseEntities/StageUseCaseEntities/StageSaveEntity";
import { IFetchCostUseCase } from "../../../../Entities/useCaseEntities/AdminUseCaseEntities/StageUseCaseEntities/FetchCostEntity";
import { IFetchStageUsecase } from "../../../../Entities/useCaseEntities/AdminUseCaseEntities/StageUseCaseEntities/FetchStageEntity";
import { IDeleteStageUseCase } from "../../../../Entities/useCaseEntities/AdminUseCaseEntities/StageUseCaseEntities/DeleteStageEntity";
import { IUpdateStageUseCase } from "../../../../Entities/useCaseEntities/AdminUseCaseEntities/StageUseCaseEntities/UpdateStageEntity";
import { commonOutput } from "../../../../Entities/Input-OutputEntities/CommonEntities/common";
import { projectOutput } from "../../../../Entities/Input-OutputEntities/ProjectEntities/project";


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

   //------------------------------------ Display the project with projectId  ------------------------------------//

   fetchCost = async (req: Request, res: Response, next: NextFunction):Promise<commonOutput> => {
      const projectId = req.params.id
      const result = await this.fetchCostusecase.execute({ projectId });
      return result
   }

   //------------------------------------Save stage ------------------------------------//

   stageSave = async (req: Request, res: Response, next: NextFunction):  Promise<commonOutput> => {
      const result = await this.stagesaveusecase.execute(req.body.data)
      return result
   }

   //------------------------------------ List of all stage with search and pagination------------------------------------//

   fetchStage = async (req: Request, res: Response, next: NextFunction): Promise<projectOutput | commonOutput> => {
      const { search, page } = req.query
      const result = await this.fetchStageusecase.execute(String(search), Number(page))
      return result
   }

   //------------------------------------ Delete stage  ------------------------------------//


   deleteStage = async (req: Request, res: Response, next: NextFunction): Promise<commonOutput> => {
      const result = await this.deletestageusecase.execute(req.body)
     return result
   }

   //------------------------------------ Update the stage ------------------------------------//

   updateStage = async (req: Request, res: Response, next: NextFunction): Promise<commonOutput> => {
      const result = await this.updateStageUseCase.execute({ projectId: req.params.id, ...req.body })
      return result
   }

}