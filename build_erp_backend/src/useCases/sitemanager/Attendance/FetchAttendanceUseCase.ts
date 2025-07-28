import { commonOutput } from "../../../Entities/Input-OutputEntities/CommonEntities/common"
import { pageWiseAttendance } from "../../../Entities/Input-OutputEntities/LabourEntities/attendance"
import { IAttendanceRepository } from "../../../Entities/repositoryEntities/Labour-management/IAttendanceRepository"
import { IfetchAttendanceUseCase } from "../../../Entities/useCaseEntities/SitemanagerUseCaseEntities/AttendanceUseCaseEntities/FetchAttendanceEntity"
import { HTTP_STATUS } from "../../../Shared/Status_code"
import { ResponseHelper } from "../../../Shared/utils/response"


export class fetchAttendanceUseCase implements IfetchAttendanceUseCase {
   private attendanceRepository: IAttendanceRepository
   constructor(attendanceRepository: IAttendanceRepository) {
      this.attendanceRepository = attendanceRepository
   }
   async execute(search: string, page: number): Promise<{ data: pageWiseAttendance | null } | commonOutput> {
      try {
         const existAttendance = await this.attendanceRepository.fetchAttendance(search, page)
         return {
            data: existAttendance
         }
      } catch (error:any) {
         return ResponseHelper.failure(error.message, HTTP_STATUS.INTERNAL_SERVER_ERROR)
      }
   }
}