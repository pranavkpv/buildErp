
import { IApproveAttendanceUseCaseEntity } from "../../interfaces/SitemanagerUseCaseEntities/AttendanceUseCaseEntities/ApproveAttendanceEntities"
import { ResponseHelper } from "../../../Shared/responseHelpers/response"
import { AttendanceSuccessMessage } from "../../../Shared/Messages/Attendance.Message"
import { commonOutput } from "../../dto/common"
import { IAttendanceRepository } from "../../../domain/interfaces/Labour-management/IAttendanceRepository"


export class ApproveAttendanceUseCase implements IApproveAttendanceUseCaseEntity {
  
   constructor(
       private attendanceRepository: IAttendanceRepository
   ) { }
   async execute(_id: string): Promise<commonOutput> {
      await this.attendanceRepository.approveAttendance(_id)
      return ResponseHelper.success(AttendanceSuccessMessage.APPROVE)
   }
}