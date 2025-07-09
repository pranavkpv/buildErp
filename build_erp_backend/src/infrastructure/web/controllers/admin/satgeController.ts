import { Request, Response, NextFunction } from "express";
import { FetchCostUseCase } from "../../../../useCases/admin/Stage/FetchCostUseCase";
import { StageSaveUseCase } from "../../../../useCases/admin/Stage/StageSaveUseCase";
import { FetchStageUsecase } from "../../../../useCases/admin/Stage/FetchStageUseCase";
import { DeleteStageUseCase } from "../../../../useCases/admin/Stage/DeleteStageUseCase";


export class StageController {
   private stagesaveusecase: StageSaveUseCase
   private fetchCostusecase: FetchCostUseCase
   private fetchStageusecase: FetchStageUsecase
   private deletestageusecase: DeleteStageUseCase
   constructor(fetchCostusecase: FetchCostUseCase, stagesaveusecase: StageSaveUseCase,
      fetchStageusecase: FetchStageUsecase, deletestageusecase: DeleteStageUseCase) {
      this.fetchCostusecase = fetchCostusecase
      this.stagesaveusecase = stagesaveusecase
      this.fetchStageusecase = fetchStageusecase
      this.deletestageusecase = deletestageusecase
   }
   fetchCost = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      try {
         const projectId = req.query.project_id as string;

         if (!projectId) {
            res.status(400).json({ success: false, message: "Missing projectId in query" });
            return;
         }


         const result = await this.fetchCostusecase.execute({ projectId });
         res.status(200).json(result);
      } catch (error) {
         console.log(error);
         next(error);
      }
   }
   stageSave = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      try {

         const result = await this.stagesaveusecase.execute(req.body.data)
         res.status(200).json(result);

      } catch (error) {
         console.log(error);
         next(error);
      }
   }
   fetchStage = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      try {
         const {search,page} = req.query
         const result = await this.fetchStageusecase.execute(String(search),Number(page))
         res.status(200).json(result);
      } catch (error) {
         console.log(error);
         next(error);
      }
   }
   deleteStage = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      try {
         const result = await this.deletestageusecase.execute(req.body)
         res.status(200).json(result);
      } catch (error) {
         console.log(error);
         next(error);
      }
   }

}