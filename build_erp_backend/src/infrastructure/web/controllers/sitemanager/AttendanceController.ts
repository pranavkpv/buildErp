import { NextFunction, Request, Response } from "express-serve-static-core"
import { IAttendanceControllerEntity } from "../../../../Entities/ControllerEntities/SitemanagerControllerEntities/IAttendanceControllerEntity"
import { IaddAttendanceUseCase } from "../../../../Entities/useCaseEntities/SitemanagerUseCaseEntities/AttendanceUseCaseEntities/AddAttendanceEntity"
import { IfetchAttendanceUseCase } from "../../../../Entities/useCaseEntities/SitemanagerUseCaseEntities/AttendanceUseCaseEntities/FetchAttendanceEntity"
import { IDeleteAttendanceUseCase } from "../../../../Entities/useCaseEntities/SitemanagerUseCaseEntities/AttendanceUseCaseEntities/DeleteAttendanceEntity"
import { IApproveAttendanceUseCase } from "../../../../Entities/useCaseEntities/SitemanagerUseCaseEntities/AttendanceUseCaseEntities/ApproveAttendanceEntities"
import { IFetchAttendanceByIdUseCase } from "../../../../Entities/useCaseEntities/SitemanagerUseCaseEntities/AttendanceUseCaseEntities/FetchAttendanceBYIdEntity"
import { IEditAttendanceUseCase } from "../../../../Entities/useCaseEntities/SitemanagerUseCaseEntities/AttendanceUseCaseEntities/EditAttendanceEntity"
import { HTTP_STATUS } from "../../../../Shared/Status_code"

export class AttendanceController implements IAttendanceControllerEntity {
   private addAttendaceUseCase: IaddAttendanceUseCase
   private fetchattendanceusecase: IfetchAttendanceUseCase
   private deleteattendanceUsecase: IDeleteAttendanceUseCase
   private approveattendanceuseCase: IApproveAttendanceUseCase
   private fetchattendancebyIdusecase: IFetchAttendanceByIdUseCase
   private editAttendanceUseCase: IEditAttendanceUseCase
   constructor(addAttendaceUseCase: IaddAttendanceUseCase, fetchattendanceusecase: IfetchAttendanceUseCase,
      deleteattendanceUsecase: IDeleteAttendanceUseCase, approveattendanceuseCase: IApproveAttendanceUseCase,
      fetchattendancebyIdusecase: IFetchAttendanceByIdUseCase, editAttendanceUseCase: IEditAttendanceUseCase
   ) {
      this.addAttendaceUseCase = addAttendaceUseCase
      this.fetchattendanceusecase = fetchattendanceusecase
      this.deleteattendanceUsecase = deleteattendanceUsecase
      this.approveattendanceuseCase = approveattendanceuseCase
      this.fetchattendancebyIdusecase = fetchattendancebyIdusecase
      this.editAttendanceUseCase = editAttendanceUseCase
   }


   addAttendance = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      const result = await this.addAttendaceUseCase.execute(req.body)
      res.status(result.status_code).json(result)
   }


   editAttendance = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      const result = await this.editAttendanceUseCase.execute(req.body)
      res.status(result.status_code).json(result)
   }


   fetchAttendance = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      const { search, page } = req.query
      const result = await this.fetchattendanceusecase.execute(String(search), Number(page))
      res.status(HTTP_STATUS.OK).json(result)
   }


   deleteAttendance = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      const _id = req.params.id
      const result = await this.deleteattendanceUsecase.execute(_id)
      res.status(result.status_code).json(result)
   }


   approveAttendance = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      const _id = req.params.id
      const result = await this.approveattendanceuseCase.execute(_id)
      res.status(result.status_code).json(result)
   }


   fetchEditcontroller = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      const _id = req.params.id
      const result = await this.fetchattendancebyIdusecase.execute(_id)
      res.status(HTTP_STATUS.OK).json(result)
   }
}