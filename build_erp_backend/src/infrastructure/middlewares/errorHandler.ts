import { Request, Response } from 'express';
import { ResponseHelper } from '../../Shared/responseHelpers/response';

export const errorHandler = (
    err: Error,
    req: Request,
    res: Response,
) => {
    const response = ResponseHelper.default(err); 
    res.status(response.status_code).json(response);
};
