import { NextFunction, Request, Response } from "express-serve-static-core"
import { commonOutput } from "../../../DTO/CommonEntities/common"
import { attendanceOutput } from "../../../DTO/LabourEntities/attendance"

export interface IAttendanceControllerEntity {
   addAttendance(req: Request, res: Response, next: NextFunction):Promise<commonOutput>
   editAttendance(req: Request, res: Response, next: NextFunction): Promise<commonOutput>
   fetchAttendance(req: Request, res: Response, next: NextFunction):Promise<attendanceOutput | commonOutput>
   deleteAttendance(req: Request, res: Response, next: NextFunction): Promise<commonOutput>
   approveAttendance(req: Request, res: Response, next: NextFunction): Promise<commonOutput>
   fetchEditcontroller(req: Request, res: Response, next: NextFunction): Promise<attendanceOutput | commonOutput>

}