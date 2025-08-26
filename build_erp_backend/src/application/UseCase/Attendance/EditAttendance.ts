import { IEditAttendanceUseCase } from "../../IUseCases/IAttendance/IEditAttendance";
import { ResponseHelper } from "../../../Shared/responseHelpers/response";
import { AttendanceFailedMessage, AttendanceSuccessMessage } from "../../../Shared/Messages/Attendance.Message";
import { IAttendanceRepository } from "../../../domain/Entities/IRepository/IAttendance";
import { InputAttendance } from "../../Entities/attendance.entity";
import { commonOutput } from "../../dto/common";

export class EditAttendanceUseCase implements IEditAttendanceUseCase {
   constructor(
      private _attendanceRepository: IAttendanceRepository
   ) { }
   async execute(input: InputAttendance): Promise<commonOutput> {
      const { _id, selectedProject, selectedDate, row } = input
      if (!_id) return ResponseHelper.conflictData("Error")
      const project_id = selectedProject
      const date = selectedDate
      const labourDetails = []
      for (let element of row) {
         labourDetails.push({ labour_id: element.labour_type, daily_wage: element.wage, numberOflabour: element.number })
      }
      const existAttendance = await this._attendanceRepository.getAttendanceForEdit(_id, project_id, date)
      if (existAttendance) {
         return ResponseHelper.conflictData(AttendanceFailedMessage.EXIST)
      }
      await this._attendanceRepository.updateAttendance({ _id, selectedProject, selectedDate, row })
      return ResponseHelper.success(AttendanceSuccessMessage.UPDATE)
   }
}