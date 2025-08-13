import { NextFunction, Request, Response } from "express"
import { IchangePasswordControllerEntity } from "../../../../Entities/ControllerEntities/SitemanagerControllerEntities/IChangePasswordControllerEntity"
import { IUpdateSitemanagerPasswordUseCaseEntity } from "../../../../Entities/useCaseEntities/SitemanagerUseCaseEntities/AuthenticationUsecaseEntities/UpdateSitemanagerPasswordEntity"
import { commonOutput } from "../../../../DTO/CommonEntities/common"



export class changePasswordController implements IchangePasswordControllerEntity {
   private updateSitemanagerPassword: IUpdateSitemanagerPasswordUseCaseEntity
   constructor(updateSitemanagerPassword: IUpdateSitemanagerPasswordUseCaseEntity) {
      this.updateSitemanagerPassword = updateSitemanagerPassword
   }

   //------------------------------------ Change password of sitemanager  ------------------------------------//

   changedPassword = async (req: Request, res: Response, next: NextFunction): Promise<commonOutput> => {
      const result = await this.updateSitemanagerPassword.execute({ _id: req.params.id, ...req.body })
      return result
   }
}