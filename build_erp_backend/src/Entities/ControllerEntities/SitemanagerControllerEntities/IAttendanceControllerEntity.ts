import { NextFunction, Request, Response } from "express-serve-static-core"
import { commonOutput } from "../../Input-OutputEntities/CommonEntities/common"
import { pageWiseAttendance } from "../../Input-OutputEntities/LabourEntities/attendance"
import { IAttendanceModelEntity } from "../../ModelEntities/Attendance.Entity"

export interface IAttendanceControllerEntity {
   addAttendance(req: Request, res: Response, next: NextFunction):Promise<commonOutput>
   editAttendance(req: Request, res: Response, next: NextFunction): Promise<commonOutput>
   fetchAttendance(req: Request, res: Response, next: NextFunction):Promise<{data:pageWiseAttendance | null} | commonOutput>
   deleteAttendance(req: Request, res: Response, next: NextFunction): Promise<commonOutput>
   approveAttendance(req: Request, res: Response, next: NextFunction): Promise<commonOutput>
   fetchEditcontroller(req: Request, res: Response, next: NextFunction): Promise<IAttendanceModelEntity | null | commonOutput>

}