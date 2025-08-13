import { IFetchAttendanceByIdUseCaseEntity } from "../../Entities/useCaseEntities/SitemanagerUseCaseEntities/AttendanceUseCaseEntities/FetchAttendanceBYIdEntity";
import { ResponseHelper } from "../../Shared/ResponseHelper/response";
import { commonOutput } from "../../DTO/CommonEntities/common";
import { attendanceOutput } from "../../DTO/LabourEntities/attendance";
import { IAttendanceRepositoryEntity } from "../../Entities/repositoryEntities/Labour-management/IAttendanceRepository";
import { AttendanceSuccessMessage } from "../../Shared/Messages/Attendance.Message";

export class FetchAttendanceByIdUseCase implements IFetchAttendanceByIdUseCaseEntity {
   private attendanceRepository: IAttendanceRepositoryEntity
   constructor(attendanceRepository: IAttendanceRepositoryEntity) {
      this.attendanceRepository = attendanceRepository
   }
   async execute(_id: string): Promise<attendanceOutput | commonOutput> {
      const data = await this.attendanceRepository.findAttendanceById(_id)
      return ResponseHelper.success(AttendanceSuccessMessage.FETCH, data)
   }
}