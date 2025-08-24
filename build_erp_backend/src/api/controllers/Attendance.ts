import { NextFunction, Request, Response } from "express-serve-static-core"
import { IAttendanceController } from "../../domain/Entities/Controller.Entity/IAttendance"
import { IaddAttendanceUseCaseEntity } from "../../application/interfaces/SitemanagerUseCaseEntities/AttendanceUseCaseEntities/AddAttendanceEntity"
import { IfetchAttendanceUseCaseEntity } from "../../application/interfaces/SitemanagerUseCaseEntities/AttendanceUseCaseEntities/FetchAttendanceEntity"
import { IDeleteAttendanceUseCaseEntity } from "../../application/interfaces/SitemanagerUseCaseEntities/AttendanceUseCaseEntities/DeleteAttendanceEntity"
import { IApproveAttendanceUseCaseEntity } from "../../application/interfaces/SitemanagerUseCaseEntities/AttendanceUseCaseEntities/ApproveAttendanceEntities"
import { IFetchAttendanceByIdUseCaseEntity } from "../../application/interfaces/SitemanagerUseCaseEntities/AttendanceUseCaseEntities/FetchAttendanceBYIdEntity"
import { IEditAttendanceUseCaseEntity } from "../../application/interfaces/SitemanagerUseCaseEntities/AttendanceUseCaseEntities/EditAttendanceEntity"
import { commonOutput } from "../../application/dto/common"
import { fetchEditAttendance, pageWiseAttendance } from "../../application/entities/attendance.entity"

export class AttendanceController implements IAttendanceController {
   constructor(
      private _addAttendanceUseCase: IaddAttendanceUseCaseEntity,
      private _fetchAttendanceUseCase: IfetchAttendanceUseCaseEntity,
      private _deleteAttendanceUseCase: IDeleteAttendanceUseCaseEntity,
      private _approveAttendanceUseCase: IApproveAttendanceUseCaseEntity,
      private _fetchAttendanceByIdUseCase: IFetchAttendanceByIdUseCaseEntity,
      private _editAttendanceUseCase: IEditAttendanceUseCaseEntity,
   ) { }

   //  Record new labour attendance for a project on a specific date
   createAttendance = async (req: Request, res: Response, next: NextFunction):
      Promise<commonOutput | void> => {
      try {
         const result = await this._addAttendanceUseCase.execute(req.body)
         return result
      } catch (error) {
         next(error)
      }
   }

   //  Update existing labour attendance details 
   updateAttendance = async (req: Request, res: Response, next: NextFunction):
      Promise<commonOutput | void> => {
      try {
         const result = await this._editAttendanceUseCase.execute(req.body)
         return result
      } catch (error) {
         next(error)
      }
   }

   //  Fetch paginated and searchable labour attendance list
   getAttendanceList = async (req: Request, res: Response, next: NextFunction):
      Promise<commonOutput<{ data: pageWiseAttendance[], totalPage: number }> | void> => {
      try {
         const { search, page } = req.query
         const result = await this._fetchAttendanceUseCase.execute({
            page: Number(page),
            search: String(search)
         })
         return result
      } catch (error) {
         next(error)
      }
   }

   // Delete labour attendance record by ID 
   removeAttendance = async (req: Request, res: Response, next: NextFunction):
      Promise<commonOutput | void> => {
      try {
         const _id = req.params.id
         const result = await this._deleteAttendanceUseCase.execute(_id)
         return result
      } catch (error) {
         next(error)
      }
   }

   //  Approve labour attendance by ID
   approveAttendance = async (req: Request, res: Response, next: NextFunction):
      Promise<commonOutput | void> => {
      try {
         const _id = req.params.id
         const result = await this._approveAttendanceUseCase.execute(_id)
         return result
      } catch (error) {
         next(error)
      }
   }

   //  Fetch single labour attendance data for edit by ID
   getAttendanceById = async (req: Request, res: Response, next: NextFunction):
      Promise<commonOutput<fetchEditAttendance> | commonOutput | void> => {
      try {
         const _id = req.params.id
         const result = await this._fetchAttendanceByIdUseCase.execute(_id)
         return result
      } catch (error) {
         next(error)
      }
   }
}
