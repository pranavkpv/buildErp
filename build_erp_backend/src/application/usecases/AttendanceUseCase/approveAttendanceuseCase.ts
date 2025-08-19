import { commonOutput } from "../../dto/CommonEntities/common"
import { IApproveAttendanceUseCaseEntity } from "../../interfaces/SitemanagerUseCaseEntities/AttendanceUseCaseEntities/ApproveAttendanceEntities"
import { ResponseHelper } from "../../../Shared/responseHelpers/response"
import { IAttendanceRepositoryEntity } from "../../../domain/interfaces/Labour-management/IAttendanceRepository"
import { AttendanceSuccessMessage } from "../../../Shared/Messages/Attendance.Message"


export class ApproveAttendanceUseCase implements IApproveAttendanceUseCaseEntity {
   private attendanceRepository: IAttendanceRepositoryEntity
   constructor(attendanceRepository: IAttendanceRepositoryEntity) {
      this.attendanceRepository = attendanceRepository
   }
   async execute(_id: string): Promise<commonOutput> {
      await this.attendanceRepository.approveAttendance(_id)
      return ResponseHelper.success(AttendanceSuccessMessage.APPROVE)
   }
}