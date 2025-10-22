import { NextFunction, Request, Response } from 'express-serve-static-core';
import { commonOutput } from '../../../application/dto/common';
import { fetchEditAttendance, pageWiseAttendance } from '../../../application/entities/attendance.entity';


export interface IAttendanceController {
   createAttendanceRecord(req: Request, res: Response, next: NextFunction):
      Promise<commonOutput | void>

   updateAttendanceRecord (req: Request, res: Response, next: NextFunction):
      Promise<commonOutput | void>

   getAttendanceRecords (req: Request, res: Response, next: NextFunction):
      Promise<commonOutput<{ data: pageWiseAttendance[], totalPage: number }> | void>

   deleteAttendanceRecord (req: Request, res: Response, next: NextFunction):
      Promise<commonOutput | void>

   approveAttendanceRecord (req: Request, res: Response, next: NextFunction):
      Promise<commonOutput | void>

   getAttendanceRecordById (req: Request, res: Response, next: NextFunction):
      Promise<commonOutput<fetchEditAttendance> | commonOutput | void>

}