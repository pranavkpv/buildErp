import { IFetchAttendanceByIdUseCaseEntity } from "../../interfaces/SitemanagerUseCaseEntities/AttendanceUseCaseEntities/FetchAttendanceBYIdEntity";
import { ResponseHelper } from "../../../Shared/responseHelpers/response";
import { commonOutput } from "../../dto/CommonEntities/common";
import { attendanceOutput } from "../../dto/LabourEntities/attendance";
import { IAttendanceRepositoryEntity } from "../../../domain/interfaces/Labour-management/IAttendanceRepository";
import { AttendanceSuccessMessage } from "../../../Shared/Messages/Attendance.Message";

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