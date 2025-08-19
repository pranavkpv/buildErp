import { commonOutput } from "../../dto/CommonEntities/common"
import { attendanceOutput } from "../../dto/LabourEntities/attendance"
import { IAttendanceRepositoryEntity } from "../../../domain/interfaces/Labour-management/IAttendanceRepository"
import { IfetchAttendanceUseCaseEntity } from "../../interfaces/SitemanagerUseCaseEntities/AttendanceUseCaseEntities/FetchAttendanceEntity"
import { ResponseHelper } from "../../../Shared/responseHelpers/response"
import { AttendanceSuccessMessage } from "../../../Shared/Messages/Attendance.Message"


export class fetchAttendanceUseCase implements IfetchAttendanceUseCaseEntity {
   private attendanceRepository: IAttendanceRepositoryEntity
   constructor(attendanceRepository: IAttendanceRepositoryEntity) {
      this.attendanceRepository = attendanceRepository
   }
   async execute(search: string, page: number): Promise<attendanceOutput | commonOutput> {
      const existAttendance = await this.attendanceRepository.fetchAttendance({ page, search })
      return ResponseHelper.success(AttendanceSuccessMessage.FETCH, existAttendance)
   }
}