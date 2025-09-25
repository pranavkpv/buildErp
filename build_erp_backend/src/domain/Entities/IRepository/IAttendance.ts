import { InputAttendance, pageWiseAttendance } from '../../../application/entities/attendance.entity';
import { listingInput } from '../../../application/entities/common.entity';
import { IAttendanceModelEntity } from '../modelEntities/attendance.entity';


export interface IAttendanceRepository {

   createAttendance(input: InputAttendance):
      Promise<void>

   getAttendanceByProjectAndDate(projectId: string, date: string):
      Promise<IAttendanceModelEntity | null>

   getPendingAttendanceList(input: listingInput):
      Promise<{ data: pageWiseAttendance[], totalPage: number }>

   deleteAttendanceById(id: string):
      Promise<void>

   approveAttendanceById(id: string):
      Promise<void>

   getAttendanceById(id: string):
      Promise<IAttendanceModelEntity | null>

   getAttendanceForEdit(id: string, projectId: string, date: string):
      Promise<IAttendanceModelEntity | null>

   updateAttendance(input: InputAttendance):
      Promise<void>

   getApprovedAttendance():
      Promise<IAttendanceModelEntity[]>

   getAttendanceBylabourId(id: string):
      Promise<IAttendanceModelEntity | null>

   getAttendanceByProjectId(id: string):
      Promise<IAttendanceModelEntity | null>

   getUnApprovedAttendanceByProjectId(id: string):
      Promise<IAttendanceModelEntity[]>
}