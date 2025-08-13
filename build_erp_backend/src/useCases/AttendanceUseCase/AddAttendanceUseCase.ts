import { attendanceInput } from "../../DTO/LabourEntities/attendance";
import { commonOutput } from "../../DTO/CommonEntities/common";
import { IaddAttendanceUseCaseEntity } from "../../Entities/useCaseEntities/SitemanagerUseCaseEntities/AttendanceUseCaseEntities/AddAttendanceEntity";
import { ResponseHelper } from "../../Shared/ResponseHelper/response";
import { IAttendanceRepositoryEntity } from "../../Entities/repositoryEntities/Labour-management/IAttendanceRepository";
import { AttendanceFailedMessage, AttendanceSuccessMessage } from "../../Shared/Messages/Attendance.Message";

export class addAttendanceUseCase implements IaddAttendanceUseCaseEntity {
   private attendanceRepository: IAttendanceRepositoryEntity
   constructor(attendanceRepository: IAttendanceRepositoryEntity) {
      this.attendanceRepository = attendanceRepository
   }
   async execute(input: attendanceInput): Promise<commonOutput> {
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
      await this.attendanceRepository.SaveAttendance({project_id, date, labourDetails})
      return ResponseHelper.createdSuccess(AttendanceSuccessMessage.ADD)
   }
}