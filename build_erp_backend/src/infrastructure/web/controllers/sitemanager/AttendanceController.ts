import { NextFunction, Request, Response } from "express-serve-static-core"
import { IAttendanceControllerEntity } from "../../../../Entities/ControllerEntities/SitemanagerControllerEntities/IAttendanceControllerEntity"
import { IaddAttendanceUseCaseEntity } from "../../../../Entities/useCaseEntities/SitemanagerUseCaseEntities/AttendanceUseCaseEntities/AddAttendanceEntity"
import { IfetchAttendanceUseCaseEntity } from "../../../../Entities/useCaseEntities/SitemanagerUseCaseEntities/AttendanceUseCaseEntities/FetchAttendanceEntity"
import { IDeleteAttendanceUseCaseEntity } from "../../../../Entities/useCaseEntities/SitemanagerUseCaseEntities/AttendanceUseCaseEntities/DeleteAttendanceEntity"
import { IApproveAttendanceUseCaseEntity } from "../../../../Entities/useCaseEntities/SitemanagerUseCaseEntities/AttendanceUseCaseEntities/ApproveAttendanceEntities"
import { IFetchAttendanceByIdUseCaseEntity } from "../../../../Entities/useCaseEntities/SitemanagerUseCaseEntities/AttendanceUseCaseEntities/FetchAttendanceBYIdEntity"
import { IEditAttendanceUseCaseEntity } from "../../../../Entities/useCaseEntities/SitemanagerUseCaseEntities/AttendanceUseCaseEntities/EditAttendanceEntity"
import { commonOutput } from "../../../../DTO/CommonEntities/common"
import { attendanceOutput } from "../../../../DTO/LabourEntities/attendance"


export class AttendanceController implements IAttendanceControllerEntity {
   private addAttendaceUseCase: IaddAttendanceUseCaseEntity
   private fetchattendanceusecase: IfetchAttendanceUseCaseEntity
   private deleteattendanceUsecase: IDeleteAttendanceUseCaseEntity
   private approveattendanceuseCase: IApproveAttendanceUseCaseEntity
   private fetchattendancebyIdusecase: IFetchAttendanceByIdUseCaseEntity
   private editAttendanceUseCase: IEditAttendanceUseCaseEntity
   constructor(addAttendaceUseCase: IaddAttendanceUseCaseEntity, fetchattendanceusecase: IfetchAttendanceUseCaseEntity,
      deleteattendanceUsecase: IDeleteAttendanceUseCaseEntity, approveattendanceuseCase: IApproveAttendanceUseCaseEntity,
      fetchattendancebyIdusecase: IFetchAttendanceByIdUseCaseEntity, editAttendanceUseCase: IEditAttendanceUseCaseEntity
   ) {
      this.addAttendaceUseCase = addAttendaceUseCase
      this.fetchattendanceusecase = fetchattendanceusecase
      this.deleteattendanceUsecase = deleteattendanceUsecase
      this.approveattendanceuseCase = approveattendanceuseCase
      this.fetchattendancebyIdusecase = fetchattendancebyIdusecase
      this.editAttendanceUseCase = editAttendanceUseCase
   }

   //------------------------------------ Take the attendance of labour in project and date ------------------------------------//

   addAttendance = async (req: Request, res: Response, next: NextFunction): Promise<commonOutput> => {
      const result = await this.addAttendaceUseCase.execute(req.body)
      return result
   }

   //------------------------------------ Update the attendance ------------------------------------//

   editAttendance = async (req: Request, res: Response, next: NextFunction): Promise<commonOutput> => {
      const result = await this.editAttendanceUseCase.execute(req.body)
      return result
   }

   //------------------------------------ List of searched and paginated attendance of labour ------------------------------------//

   fetchAttendance = async (req: Request, res: Response, next: NextFunction): Promise<attendanceOutput | commonOutput> => {
      const { search, page } = req.query
      const result = await this.fetchattendanceusecase.execute(String(search), Number(page))
      return result
   }

   //------------------------------------ Delete the attendance of labour in the project and date ------------------------------------//

   deleteAttendance = async (req: Request, res: Response, next: NextFunction): Promise<commonOutput> => {
      const _id = req.params.id
      const result = await this.deleteattendanceUsecase.execute(_id)
      return result
   }

   //------------------------------------ Approve the attendance of labour  ------------------------------------//

   approveAttendance = async (req: Request, res: Response, next: NextFunction): Promise<commonOutput> => {
      const _id = req.params.id
      const result = await this.approveattendanceuseCase.execute(_id)
      return result
   }

   //------------------------------------ Fetch labour attendance data in edit  ------------------------------------//

   fetchEditcontroller = async (req: Request, res: Response, next: NextFunction): Promise<attendanceOutput | commonOutput> => {
      const _id = req.params.id
      const result = await this.fetchattendancebyIdusecase.execute(_id)
      return result
   }
}