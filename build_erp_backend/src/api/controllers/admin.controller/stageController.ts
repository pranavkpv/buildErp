import { Request, Response, NextFunction } from "express";
import { IStageControllerEntity } from "../../../domain/Entities/ControllerEntities/AdminControllerEntities/IStageControllerEntity";
import { IStageSaveUseCaseEntity } from "../../../application/interfaces/AdminUseCaseEntities/StageUseCaseEntities/StageSaveEntity";
import { IFetchCostUseCaseEntity } from "../../../application/interfaces/AdminUseCaseEntities/StageUseCaseEntities/FetchCostEntity";
import { IFetchStageUsecaseEntity } from "../../../application/interfaces/AdminUseCaseEntities/StageUseCaseEntities/FetchStageEntity";
import { IDeleteStageUseCaseEntity } from "../../../application/interfaces/AdminUseCaseEntities/StageUseCaseEntities/DeleteStageEntity";
import { IUpdateStageUseCaseEntity } from "../../../application/interfaces/AdminUseCaseEntities/StageUseCaseEntities/UpdateStageEntity";
import { commonOutput } from "../../../application/dto/CommonEntities/common";
import { projectOutput } from "../../../application/dto/ProjectEntities/project";



export class StageController implements IStageControllerEntity {
   private stagesaveusecase: IStageSaveUseCaseEntity
   private fetchCostusecase: IFetchCostUseCaseEntity
   private fetchStageusecase: IFetchStageUsecaseEntity
   private deletestageusecase: IDeleteStageUseCaseEntity
   private updateStageUseCase: IUpdateStageUseCaseEntity
   constructor(fetchCostusecase: IFetchCostUseCaseEntity, stagesaveusecase: IStageSaveUseCaseEntity,
      fetchStageusecase: IFetchStageUsecaseEntity, deletestageusecase: IDeleteStageUseCaseEntity,
      updateStageUseCase: IUpdateStageUseCaseEntity) {
      this.fetchCostusecase = fetchCostusecase
      this.stagesaveusecase = stagesaveusecase
      this.fetchStageusecase = fetchStageusecase
      this.deletestageusecase = deletestageusecase
      this.updateStageUseCase = updateStageUseCase
   }

   //------------------------------------ Display the project with projectId  ------------------------------------//

   fetchCost = async (req: Request, res: Response, next: NextFunction): Promise<commonOutput> => {
      const projectId = req.params.id
      const result = await this.fetchCostusecase.execute({ projectId });
      return result
   }

   //------------------------------------Save stage ------------------------------------//

   stageSave = async (req: Request, res: Response, next: NextFunction): Promise<commonOutput> => {
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