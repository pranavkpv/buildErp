import { commonOutput } from "../../DTO/CommonEntities/common"
import { IApproveAttendanceUseCaseEntity } from "../../Entities/useCaseEntities/SitemanagerUseCaseEntities/AttendanceUseCaseEntities/ApproveAttendanceEntities"
import { ResponseHelper } from "../../Shared/ResponseHelper/response"
import { IAttendanceRepositoryEntity } from "../../Entities/repositoryEntities/Labour-management/IAttendanceRepository"
import { AttendanceSuccessMessage } from "../../Shared/Messages/Attendance.Message"


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