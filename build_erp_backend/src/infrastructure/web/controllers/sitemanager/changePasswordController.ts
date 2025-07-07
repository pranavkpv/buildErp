import { NextFunction, Request, Response } from "express"
import { UpdateSitemanagerPasswordUseCase } from "../../../../useCases/sitemanager/Dashboard/UpdateSitemanagerPasswordUseCase"



export class changePasswordController{
   private updateSitemanagerPassword : UpdateSitemanagerPasswordUseCase
   constructor(updateSitemanagerPassword : UpdateSitemanagerPasswordUseCase){
      this.updateSitemanagerPassword = updateSitemanagerPassword
   }
   changedPassword = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      try {
         const result = await this.updateSitemanagerPassword.execute(req.body)
         res.status(200).json(result)
      } catch (error) {
         console.log(error)
         next(error)
      }
   }
}