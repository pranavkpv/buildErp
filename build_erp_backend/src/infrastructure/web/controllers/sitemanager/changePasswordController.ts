import { NextFunction, Request, Response } from "express"
import { IchangePasswordControllerEntity } from "../../../../Entities/ControllerEntities/SitemanagerControllerEntities/IChangePasswordControllerEntity"
import { IUpdateSitemanagerPasswordUseCase } from "../../../../Entities/useCaseEntities/SitemanagerUseCaseEntities/AuthenticationUsecaseEntities/UpdateSitemanagerPasswordEntity"
import { commonOutput } from "../../../../Entities/Input-OutputEntities/CommonEntities/common"



export class changePasswordController implements IchangePasswordControllerEntity {
   private updateSitemanagerPassword: IUpdateSitemanagerPasswordUseCase
   constructor(updateSitemanagerPassword: IUpdateSitemanagerPasswordUseCase) {
      this.updateSitemanagerPassword = updateSitemanagerPassword
   }

   //------------------------------------ Change password of sitemanager  ------------------------------------//

   changedPassword = async (req: Request, res: Response, next: NextFunction): Promise<commonOutput> => {
      const result = await this.updateSitemanagerPassword.execute({ _id: req.params.id, ...req.body })
      return result
   }
}