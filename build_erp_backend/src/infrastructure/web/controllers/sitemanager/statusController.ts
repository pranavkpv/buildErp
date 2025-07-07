import { Request, Response, NextFunction } from "express";
import { FetchStatusUseCase } from "../../../../useCases/sitemanager/Common/FetchStatusUseCase";
import { StageStatusChangeUseCase } from "./StageSatusChangeUseCase";

export class statusController {
   private fetchStatusUseCase: FetchStatusUseCase
   private stageStatusChangeUseCase: StageStatusChangeUseCase
   constructor(fetchStatusUseCase: FetchStatusUseCase, stageStatusChangeUseCase: StageStatusChangeUseCase) {
      this.fetchStatusUseCase = fetchStatusUseCase
      this.stageStatusChangeUseCase = stageStatusChangeUseCase
   }
   fetchStageData = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      try {
         const project_id = req.query.project_id as string;

         if (!project_id) {
            res.status(400).json({ success: false, message: "Missing projectId in query" });
            return;
         }

         const data = await this.fetchStatusUseCase.execute({ projectId: project_id });
         res.status(200).json({ success: true, data });
      } catch (error) {
         console.log(error);
         next(error);
      }
   }
   changeStatus = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      try {
         const result = await this.stageStatusChangeUseCase.execute(req.body)
         res.status(200).json(result);
      } catch (error) {
         console.log(error);
         next(error);
      }
   }

}