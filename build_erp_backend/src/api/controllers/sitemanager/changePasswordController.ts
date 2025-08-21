import { NextFunction, Request, Response } from "express"
import { IchangePasswordControllerEntity } from "../../../domain/Entities/ControllerEntities/SitemanagerControllerEntities/IChangePasswordControllerEntity"
import { IUpdateSitemanagerPasswordUseCase } from "../../../application/interfaces/SitemanagerUseCaseEntities/AuthenticationUsecaseEntities/UpdateSitemanagerPasswordEntity"
import { commonOutput } from "../../../application/dto/common"




export class changePasswordController implements IchangePasswordControllerEntity {
   constructor(
      private _updateSitemanagerPassword: IUpdateSitemanagerPasswordUseCase
   ) { }
   changedPassword = async (req: Request, res: Response, next: NextFunction): Promise<commonOutput> => {
      const result = await this._updateSitemanagerPassword.execute({ _id: req.params.id, ...req.body })
      return result
   }
}