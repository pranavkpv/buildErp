import { NextFunction, Request, Response } from "express";
import { HTTP_STATUS } from "../../../Shared/statusCodes/statusCodes";
import { commonFailedMessage } from "../../../Shared/Messages/Common.Message";
import { AddSitemanagerToProjectFailedMessage } from "../../../Shared/Messages/AddSitemanager.message";

export const validateAddSitemanagerToproject = (req: Request, res: Response, next: NextFunction): void => {
   const { siteManager_id, selectedproject } = req.body
   if (!siteManager_id) {
      res.status(HTTP_STATUS.BAD_REQUEST).json(commonFailedMessage.FIELD_REQUIRED);
      return
   }
   if (selectedproject.length == 0) {
      res.status(HTTP_STATUS.BAD_REQUEST).json(AddSitemanagerToProjectFailedMessage.ATLEAST_ONE_PROJECT)
      return
   }
   next()
}