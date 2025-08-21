
import { IaddAttendanceUseCaseEntity } from "../../interfaces/SitemanagerUseCaseEntities/AttendanceUseCaseEntities/AddAttendanceEntity";
import { ResponseHelper } from "../../../Shared/responseHelpers/response";
import { AttendanceFailedMessage, AttendanceSuccessMessage } from "../../../Shared/Messages/Attendance.Message";
import { IAttendanceRepository } from "../../../domain/interfaces/Labour-management/IAttendanceRepository";
import { InputAttendance } from "../../entities/attendance.entity";
import { commonOutput } from "../../dto/common";

export class addAttendanceUseCase implements IaddAttendanceUseCaseEntity {
   
   constructor(
      private attendanceRepository: IAttendanceRepository
   ) {
   }
   async execute(input: InputAttendance): Promise<commonOutput> {
      const { selectedProject, selectedDate, row } = input
      const project_id = selectedProject
      const date = selectedDate
      const labourDetails = []
      for (let element of row) {
         labourDetails.push({ labour_id: element.labour_type, daily_wage: element.wage, numberOflabour: element.number })
      }
      const existAttendance = await this.attendanceRepository.findExistAttendance(project_id, date)
      if (existAttendance) {
         return ResponseHelper.conflictData(AttendanceFailedMessage.EXIST)
      }
      await this.attendanceRepository.SaveAttendance({ selectedProject, selectedDate, row})
      return ResponseHelper.createdSuccess(AttendanceSuccessMessage.ADD)
   }
}