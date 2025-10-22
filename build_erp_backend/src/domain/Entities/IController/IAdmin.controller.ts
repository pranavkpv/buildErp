import { NextFunction, Request, Response } from 'express';
import { IAdminModelEntity } from '../modelEntities/admin.entity';
import { Tokens } from '../../../application/entities/token.entity';
import { commonOutput } from '../../../application/dto/common';

export interface IAdminController {

   loginAdmin (req: Request, res: Response, next: NextFunction):
      Promise<commonOutput<{ data: IAdminModelEntity, token: Tokens }> | commonOutput | void>;
      
   logoutAdmin (req: Request, res: Response, next: NextFunction):
      Promise<commonOutput | void>;
}
