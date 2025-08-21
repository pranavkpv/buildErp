import { NextFunction, Request, Response } from "express"
import { commonOutput } from "../../../../application/dto/common"


export interface IstatusController {
   changeStatus(req: Request, res: Response, next: NextFunction): Promise<commonOutput>
   uploadImage(req: Request, res: Response, next: NextFunction): Promise<commonOutput | void>
}