import { NextFunction, Request, Response } from "express"
import { IchangePasswordControllerEntity } from "../../../../Entities/ControllerEntities/SitemanagerControllerEntities/IChangePasswordControllerEntity"
import { IUpdateSitemanagerPasswordUseCase } from "../../../../Entities/useCaseEntities/SitemanagerUseCaseEntities/AuthenticationUsecaseEntities/UpdateSitemanagerPasswordEntity"



export class changePasswordController implements IchangePasswordControllerEntity {
   private updateSitemanagerPassword: IUpdateSitemanagerPasswordUseCase
   constructor(updateSitemanagerPassword: IUpdateSitemanagerPasswordUseCase) {
      this.updateSitemanagerPassword = updateSitemanagerPassword
   }
   changedPassword = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      const result = await this.updateSitemanagerPassword.execute({ _id: req.params.id, ...req.body })
      res.status(result.status_code).json(result)
   }
}