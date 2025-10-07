import { NextFunction, Request, Response } from 'express-serve-static-core';
import { commonOutput } from '../../../application/dto/common';
import { fetchEditAttendance, pageWiseAttendance } from '../../../application/entities/attendance.entity';


export interface IAttendanceController {
   createAttendance(req: Request, res: Response, next: NextFunction):
      Promise<commonOutput | void>

   updateAttendance(req: Request, res: Response, next: NextFunction):
      Promise<commonOutput | void>

   getAttendanceList(req: Request, res: Response, next: NextFunction):
      Promise<commonOutput<{ data: pageWiseAttendance[], totalPage: number }> | void>

   removeAttendance(req: Request, res: Response, next: NextFunction):
      Promise<commonOutput | void>

   approveAttendance(req: Request, res: Response, next: NextFunction):
      Promise<commonOutput | void>

   getAttendanceById(req: Request, res: Response, next: NextFunction):
      Promise<commonOutput<fetchEditAttendance> | commonOutput | void>

}