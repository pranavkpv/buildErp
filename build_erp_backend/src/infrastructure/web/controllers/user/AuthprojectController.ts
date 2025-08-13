import { NextFunction, Request, Response } from "express-serve-static-core";
import { IAuthProjectControllerEntity } from "../../../../Entities/ControllerEntities/UserControllerEntities/AuthProjectControllerEntity";
import { IFetchUserProjectUseCaseEntity } from "../../../../Entities/useCaseEntities/UserUseCaseEntities/ProjectDisplayUseCaseEntities/FetchUserProjectUsecaseEntity";
import { IFetchStatusBaseProjectUseCaseEntity } from "../../../../Entities/useCaseEntities/UserUseCaseEntities/ProjectDisplayUseCaseEntities/FetchStatusBaseProjectUseCaseEntity";
import { commonOutput } from "../../../../DTO/CommonEntities/common";
import { projectOutput } from "../../../../DTO/ProjectEntities/project";

export class AuthProjectController implements IAuthProjectControllerEntity {
   private fetchUserprojectUseCase: IFetchUserProjectUseCaseEntity
   private fetchStatusBaseProjectUseCase: IFetchStatusBaseProjectUseCaseEntity
   constructor(fetchUserprojectUseCase: IFetchUserProjectUseCaseEntity, fetchStatusBaseProjectUseCase: IFetchStatusBaseProjectUseCaseEntity) {
      this.fetchUserprojectUseCase = fetchUserprojectUseCase
      this.fetchStatusBaseProjectUseCase = fetchStatusBaseProjectUseCase
   }

   //------------------------------------ fetching project by userId  ------------------------------------//

   fetchProject = async (req: Request, res: Response, next: NextFunction): Promise<projectOutput  | commonOutput> => {
      const userId = req.params.user
      const result = await this.fetchUserprojectUseCase.execute(userId)
      return result
   }

   //------------------------------------ fetching projects based on status serach Item and selected area filter  ------------------------------------//

   fetchProjectStatusBaseProject = async (req: Request, res: Response, next: NextFunction): Promise<projectOutput | commonOutput> => {
      const { searchItem, selectedArea, page } = req.query
      const status = req.params.status
      const result = await this.fetchStatusBaseProjectUseCase.execute(status, String(searchItem), Number(selectedArea), Number(page))
      return result
   }

}
