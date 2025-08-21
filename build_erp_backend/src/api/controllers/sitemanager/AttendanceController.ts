import { NextFunction, Request, Response } from "express-serve-static-core"
import { IAttendanceControllerEntity } from "../../../domain/Entities/ControllerEntities/SitemanagerControllerEntities/IAttendanceControllerEntity"
import { IaddAttendanceUseCaseEntity } from "../../../application/interfaces/SitemanagerUseCaseEntities/AttendanceUseCaseEntities/AddAttendanceEntity"
import { IfetchAttendanceUseCaseEntity } from "../../../application/interfaces/SitemanagerUseCaseEntities/AttendanceUseCaseEntities/FetchAttendanceEntity"
import { IDeleteAttendanceUseCaseEntity } from "../../../application/interfaces/SitemanagerUseCaseEntities/AttendanceUseCaseEntities/DeleteAttendanceEntity"
import { IApproveAttendanceUseCaseEntity } from "../../../application/interfaces/SitemanagerUseCaseEntities/AttendanceUseCaseEntities/ApproveAttendanceEntities"
import { IFetchAttendanceByIdUseCaseEntity } from "../../../application/interfaces/SitemanagerUseCaseEntities/AttendanceUseCaseEntities/FetchAttendanceBYIdEntity"
import { IEditAttendanceUseCaseEntity } from "../../../application/interfaces/SitemanagerUseCaseEntities/AttendanceUseCaseEntities/EditAttendanceEntity"
import { commonOutput } from "../../../application/dto/common"
import { fetchEditAttendance, pageWiseAttendance } from "../../../application/entities/attendance.entity"



export class AttendanceController implements IAttendanceControllerEntity {

   constructor(
      private addAttendaceUseCase: IaddAttendanceUseCaseEntity,
      private fetchattendanceusecase: IfetchAttendanceUseCaseEntity,
      private deleteattendanceUsecase: IDeleteAttendanceUseCaseEntity,
      private approveattendanceuseCase: IApproveAttendanceUseCaseEntity,
      private fetchattendancebyIdusecase: IFetchAttendanceByIdUseCaseEntity,
      private editAttendanceUseCase: IEditAttendanceUseCaseEntity,
   ) { }

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

   fetchAttendance = async (req: Request, res: Response, next: NextFunction):  Promise<commonOutput<{data:pageWiseAttendance[],totalPage:number}>> => {
      const { search, page } = req.query
      const result = await this.fetchattendanceusecase.execute({page:Number(page),search:String(search)})
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

   fetchEditcontroller = async (req: Request, res: Response, next: NextFunction): Promise<commonOutput<fetchEditAttendance> | commonOutput> => {
      const _id = req.params.id
      const result = await this.fetchattendancebyIdusecase.execute(_id)
      return result
   }
}