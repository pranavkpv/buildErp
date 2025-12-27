import { Request, Response, NextFunction } from 'express'; // Added NextFunction
import { ResponseHelper } from '../../Shared/responseHelpers/response';

export const errorHandler = (
    err: any,           // Changed to 'any' or 'Error'
    req: Request,
    res: Response,
    next: NextFunction  // IMPORTANT: You must include this 4th argument
) => {
    // Log the error for your own debugging in PM2 logs
    console.error('--- Error Caught by Middleware ---');
    console.error(err); 

    const response = ResponseHelper.default(err); 
    
    // Now 'res' is correctly mapped to the Response object
    res.status(response.status_code || 500).json(response);
};