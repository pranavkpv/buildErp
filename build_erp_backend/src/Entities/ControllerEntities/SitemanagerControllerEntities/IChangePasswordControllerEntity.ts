import { NextFunction, Request, Response } from "express"
import { commonOutput } from "../../Input-OutputEntities/CommonEntities/common"

export interface IchangePasswordControllerEntity {
   changedPassword(req: Request, res: Response, next: NextFunction): Promise<commonOutput>
}