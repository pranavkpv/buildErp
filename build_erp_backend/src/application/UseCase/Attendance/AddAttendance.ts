import { IaddAttendanceUseCase } from "../../IUseCases/IAttendance/IAddAttendance";
import { ResponseHelper } from "../../../Shared/responseHelpers/response";
import { AttendanceFailedMessage, AttendanceSuccessMessage } from "../../../Shared/Messages/Attendance.Message";
import { IAttendanceRepository } from "../../../domain/Entities/IRepository/IAttendance";
import { InputAttendance } from "../../Entities/attendance.entity";
import { commonOutput } from "../../dto/common";

export class AddAttendanceUseCase implements IaddAttendanceUseCase {

   constructor(
      private _attendanceRepository: IAttendanceRepository
   ) {
   }
   async execute(input: InputAttendance):
      Promise<commonOutput> {
      const { selectedProject, selectedDate, row } = input
      const project_id = selectedProject
      const date = selectedDate
      const existAttendance = await this._attendanceRepository.getAttendanceByProjectAndDate(project_id, date)
      if (existAttendance) {
         return ResponseHelper.conflictData(AttendanceFailedMessage.EXIST)
      }
      await this._attendanceRepository.createAttendance({ selectedProject, selectedDate, row })
      return ResponseHelper.createdSuccess(AttendanceSuccessMessage.ADD)
   }
}