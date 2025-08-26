import { InputAttendance, pageWiseAttendance } from "../../../application/Entities/attendance.entity"
import { listingInput } from "../../../application/Entities/common.entity"
import { IAttendanceModelEntity } from "../modelEntities/attendance.entity"


export interface IAttendanceRepository {

   createAttendance(input: InputAttendance):
      Promise<void>

   getAttendanceByProjectAndDate(project_id: string, date: string):
      Promise<IAttendanceModelEntity | null>

   getPendingAttendanceList(input: listingInput):
      Promise<{ data: pageWiseAttendance[], totalPage: number }>

   deleteAttendanceById(_id: string):
      Promise<void>

   approveAttendanceById(_id: string):
      Promise<void>

   getAttendanceById(_id: string):
      Promise<IAttendanceModelEntity | null>

   getAttendanceForEdit(_id: string, project_id: string, date: string):
      Promise<IAttendanceModelEntity | null>

   updateAttendance(input: InputAttendance):
      Promise<void>

   getApprovedAttendance():
      Promise<IAttendanceModelEntity[]>
}