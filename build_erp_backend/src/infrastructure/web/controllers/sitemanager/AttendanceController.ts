import { NextFunction, Request, Response } from "express-serve-static-core"
import { addAttendanceUseCase } from "../../../../useCases/sitemanager/Common/AddAttendanceUseCase"
import { fetchAttendanceUseCase } from "../../../../useCases/sitemanager/Common/FetchAttendanceUseCase"
import { DeleteAttendanceUseCase } from "../../../../useCases/sitemanager/Common/DeleteAttandanceUseCase"
import { ApproveAttendanceUseCase } from "../../../../useCases/sitemanager/Common/approveAttendanceuseCase"
import { FetchAttendanceByIdUseCase } from "../../../../useCases/sitemanager/Common/FetchAttendanceBYIdUseCase"
import { EditAttendanceUseCase } from "../../../../useCases/sitemanager/Common/EditAttendanceUseCase"

export class AttendanceController {
   private addAttendaceUseCase: addAttendanceUseCase
   private fetchattendanceusecase: fetchAttendanceUseCase
   private deleteattendanceUsecase: DeleteAttendanceUseCase
   private approveattendanceuseCase: ApproveAttendanceUseCase
   private fetchattendancebyIdusecase: FetchAttendanceByIdUseCase
   private editAttendanceUseCase : EditAttendanceUseCase
   constructor(addAttendaceUseCase: addAttendanceUseCase, fetchattendanceusecase: fetchAttendanceUseCase,
      deleteattendanceUsecase: DeleteAttendanceUseCase, approveattendanceuseCase: ApproveAttendanceUseCase,
      fetchattendancebyIdusecase: FetchAttendanceByIdUseCase,editAttendanceUseCase : EditAttendanceUseCase
   ) {
      this.addAttendaceUseCase = addAttendaceUseCase
      this.fetchattendanceusecase = fetchattendanceusecase
      this.deleteattendanceUsecase = deleteattendanceUsecase
      this.approveattendanceuseCase = approveattendanceuseCase
      this.fetchattendancebyIdusecase = fetchattendancebyIdusecase
      this.editAttendanceUseCase = editAttendanceUseCase
   }
   addAttendance = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      try {
         const result = await this.addAttendaceUseCase.execute(req.body)
         res.status(200).json(result)
      } catch (error) {
         console.log(error)
         next(error)
      }
   }

   editAttendance = async (req: Request, res: Response, next: NextFunction): Promise<void> =>{
      try {
         const result = await this.editAttendanceUseCase.execute(req.body)
         res.status(200).json(result)
      } catch (error) {
         console.log(error)
         next(error)
      }
   }




   fetchAttendance = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      try {
         const { search, page } = req.query
         const result = await this.fetchattendanceusecase.execute(String(search), Number(page))
         res.status(200).json(result)
      } catch (error) {
         console.log(error)
         next(error)
      }
   }
   deleteAttendance = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      try {
         const _id = req.query.id as string
         const result = await this.deleteattendanceUsecase.execute(_id)
         res.status(200).json(result)
      } catch (error) {
         console.log(error)
         next(error)
      }
   }
   approveAttendance = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      try {
         const _id = req.query.id as string
         const result = await this.approveattendanceuseCase.execute(_id)
         res.status(200).json(result)
      } catch (error) {
         console.log(error)
         next(error)
      }
   }
   fetchEditcontroller = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      try {

         const _id = req.query._id as string
         const result = await this.fetchattendancebyIdusecase.execute(_id)

         res.status(200).json(result)
      } catch (error) {
         console.log(error)
         next(error)
      }
   }
}