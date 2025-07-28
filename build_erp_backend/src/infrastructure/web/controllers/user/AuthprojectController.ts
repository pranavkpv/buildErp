import { NextFunction, Request, Response } from "express-serve-static-core";
import { IAuthProjectControllerEntity } from "../../../../Entities/ControllerEntities/UserControllerEntities/AuthProjectControllerEntity";
import { IFetchUserProjectUseCase } from "../../../../Entities/useCaseEntities/UserUseCaseEntities/ProjectDisplayUseCaseEntities/FetchUserProjectUsecaseEntity";
import { HTTP_STATUS } from "../../../../Shared/Status_code";
import { ERROR_MESSAGE } from "../../../../Shared/Message";
import { IFetchStatusBaseProjectUseCase } from "../../../../Entities/useCaseEntities/UserUseCaseEntities/ProjectDisplayUseCaseEntities/FetchStatusBaseProjectUseCaseEntity";
import { IProjectModelEntity } from "../../../../Entities/ModelEntities/ProjectEntity";
import { commonOutput } from "../../../../Entities/Input-OutputEntities/CommonEntities/common";

export class AuthProjectController implements IAuthProjectControllerEntity {
   private fetchUserprojectUseCase: IFetchUserProjectUseCase
   private fetchStatusBaseProjectUseCase: IFetchStatusBaseProjectUseCase
   constructor(fetchUserprojectUseCase: IFetchUserProjectUseCase, fetchStatusBaseProjectUseCase: IFetchStatusBaseProjectUseCase) {
      this.fetchUserprojectUseCase = fetchUserprojectUseCase
      this.fetchStatusBaseProjectUseCase = fetchStatusBaseProjectUseCase
   }

   //------------------------------------ fetching project by userId  ------------------------------------//

   fetchProject = async (req: Request, res: Response, next: NextFunction): Promise<IProjectModelEntity[] | void | commonOutput> => {
      const userId = req.params.user
      if (typeof userId !== "string") {
         res.status(HTTP_STATUS.OK).json({ message: ERROR_MESSAGE.USER.USER_NOT_FOUND });
         return
      }
      const result = await this.fetchUserprojectUseCase.execute(userId)
      return result
   }

   //------------------------------------ fetching projects based on status serach Item and selected area filter  ------------------------------------//

   fetchProjectStatusBaseProject = async (req: Request, res: Response, next: NextFunction): Promise<{ data: IProjectModelEntity[], totalPage: number, areas: number[] } | commonOutput> => {
      const { searchItem, selectedArea, page } = req.query
      const status = req.params.status
      const result = await this.fetchStatusBaseProjectUseCase.execute(status, String(searchItem), Number(selectedArea), Number(page))
      return result
   }

}
