import { commonOutput } from "../../../Entities/Input-OutputEntities/CommonEntities/common"
import { attendanceOutput, pageWiseAttendance } from "../../../Entities/Input-OutputEntities/LabourEntities/attendance"
import { IAttendanceRepository } from "../../../Entities/repositoryEntities/Labour-management/IAttendanceRepository"
import { IfetchAttendanceUseCase } from "../../../Entities/useCaseEntities/SitemanagerUseCaseEntities/AttendanceUseCaseEntities/FetchAttendanceEntity"
import { SUCCESS_MESSAGE } from "../../../Shared/Message"
import { HTTP_STATUS } from "../../../Shared/Status_code"
import { ResponseHelper } from "../../../Shared/utils/response"


export class fetchAttendanceUseCase implements IfetchAttendanceUseCase {
   private attendanceRepository: IAttendanceRepository
   constructor(attendanceRepository: IAttendanceRepository) {
      this.attendanceRepository = attendanceRepository
   }
   async execute(search: string, page: number): Promise<attendanceOutput | commonOutput> {
      try {
         const existAttendance = await this.attendanceRepository.fetchAttendance(search, page)
         return {
            success: true,
            message: SUCCESS_MESSAGE.ATTENDANCE.FETCH,
            status_code: HTTP_STATUS.OK,
            data: existAttendance
         }
      } catch (error: any) {
         return ResponseHelper.failure(error.message, HTTP_STATUS.INTERNAL_SERVER_ERROR)
      }
   }
}