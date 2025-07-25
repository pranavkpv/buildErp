import { NextFunction, Request, Response } from "express-serve-static-core"

export interface IAttendanceControllerEntity {
   addAttendance(req: Request, res: Response, next: NextFunction): Promise<void>
   editAttendance(req: Request, res: Response, next: NextFunction): Promise<void>
   fetchAttendance(req: Request, res: Response, next: NextFunction): Promise<void>
   deleteAttendance(req: Request, res: Response, next: NextFunction): Promise<void>
   approveAttendance(req: Request, res: Response, next: NextFunction): Promise<void>
   fetchEditcontroller(req: Request, res: Response, next: NextFunction): Promise<void>

}