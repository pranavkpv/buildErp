import { commonOutput } from "../../DTO/CommonEntities/common"
import { attendanceOutput } from "../../DTO/LabourEntities/attendance"
import { IAttendanceRepositoryEntity } from "../../Entities/repositoryEntities/Labour-management/IAttendanceRepository"
import { IfetchAttendanceUseCaseEntity } from "../../Entities/useCaseEntities/SitemanagerUseCaseEntities/AttendanceUseCaseEntities/FetchAttendanceEntity"
import { ResponseHelper } from "../../Shared/ResponseHelper/response"
import { AttendanceSuccessMessage } from "../../Shared/Messages/Attendance.Message"


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