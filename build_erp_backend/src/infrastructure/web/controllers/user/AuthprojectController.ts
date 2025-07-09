import { NextFunction, Request, Response } from "express-serve-static-core";
import { FetchUserProjectUseCase } from "../../../../useCases/user/common/fetchUsersProjectUsecase";

export class AuthProjectController {
   private fetchUserprojectUseCase: FetchUserProjectUseCase
   constructor(fetchUserprojectUseCase: FetchUserProjectUseCase) {
      this.fetchUserprojectUseCase = fetchUserprojectUseCase
   }
   fetchProject = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      try {
         const { userId } = req.query;
         if (typeof userId !== "string") {
            res.status(400).json({ message: "Invalid or missing userId" });
            return
         }

         const result = await this.fetchUserprojectUseCase.execute(userId)
         res.status(200).json(result)

      } catch (error) {
         console.log(error)
         next(error)
      }
   }

}
