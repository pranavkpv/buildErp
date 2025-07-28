
import { IAttendanceRepository } from "../../../Entities/repositoryEntities/Labour-management/IAttendanceRepository";
import { IFetchAttendanceByIdUseCase } from "../../../Entities/useCaseEntities/SitemanagerUseCaseEntities/AttendanceUseCaseEntities/FetchAttendanceBYIdEntity";
import { IAttendanceModelEntity } from "../../../Entities/ModelEntities/Attendance.Entity";
import { ResponseHelper } from "../../../Shared/utils/response";
import { HTTP_STATUS } from "../../../Shared/Status_code";
import { commonOutput } from "../../../Entities/Input-OutputEntities/CommonEntities/common";

export class FetchAttendanceByIdUseCase implements IFetchAttendanceByIdUseCase {
   private attendanceRepository: IAttendanceRepository
   constructor(attendanceRepository: IAttendanceRepository) {
      this.attendanceRepository = attendanceRepository
   }
   async execute(_id: string): Promise<IAttendanceModelEntity | null | commonOutput> {
      try {
         const data = await this.attendanceRepository.findAttendanceById(_id)
         return data
      } catch (error: any) {
         return ResponseHelper.failure(error.message, HTTP_STATUS.INTERNAL_SERVER_ERROR)
      }
   }
}