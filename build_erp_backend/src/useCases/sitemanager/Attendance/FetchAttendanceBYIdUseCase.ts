
import { IAttendanceRepository } from "../../../Entities/repositoryEntities/Labour-management/IAttendanceRepository";
import { IFetchAttendanceByIdUseCase } from "../../../Entities/useCaseEntities/SitemanagerUseCaseEntities/AttendanceUseCaseEntities/FetchAttendanceBYIdEntity";
import { IAttendanceModelEntity } from "../../../Entities/ModelEntities/Attendance.Entity";
import { ResponseHelper } from "../../../Shared/utils/response";
import { HTTP_STATUS } from "../../../Shared/Status_code";
import { commonOutput } from "../../../Entities/Input-OutputEntities/CommonEntities/common";
import { attendanceOutput } from "../../../Entities/Input-OutputEntities/LabourEntities/attendance";
import { SUCCESS_MESSAGE } from "../../../Shared/Message";

export class FetchAttendanceByIdUseCase implements IFetchAttendanceByIdUseCase {
   private attendanceRepository: IAttendanceRepository
   constructor(attendanceRepository: IAttendanceRepository) {
      this.attendanceRepository = attendanceRepository
   }
   async execute(_id: string): Promise<attendanceOutput | commonOutput> {
      try {
         const data = await this.attendanceRepository.findAttendanceById(_id)
         return {
            success:true,
            message:SUCCESS_MESSAGE.ATTENDANCE.FETCH,
            status_code:HTTP_STATUS.OK,
            data:data
         }
      } catch (error: any) {
         return ResponseHelper.failure(error.message, HTTP_STATUS.INTERNAL_SERVER_ERROR)
      }
   }
}