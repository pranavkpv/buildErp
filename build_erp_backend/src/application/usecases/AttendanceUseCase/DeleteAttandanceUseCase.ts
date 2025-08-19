import { commonOutput } from "../../dto/CommonEntities/common"
import { IDeleteAttendanceUseCaseEntity } from "../../interfaces/SitemanagerUseCaseEntities/AttendanceUseCaseEntities/DeleteAttendanceEntity"
import { ResponseHelper } from "../../../Shared/responseHelpers/response"
import { IAttendanceRepositoryEntity } from "../../../domain/interfaces/Labour-management/IAttendanceRepository"
import { AttendanceSuccessMessage } from "../../../Shared/Messages/Attendance.Message"


export class DeleteAttendanceUseCase implements IDeleteAttendanceUseCaseEntity {
  private attendanceRepository: IAttendanceRepositoryEntity
  constructor(attendanceRepository: IAttendanceRepositoryEntity) {
    this.attendanceRepository = attendanceRepository
  }
  async execute(_id: string): Promise<commonOutput> {
    await this.attendanceRepository.deleteAttendance(_id)
    return ResponseHelper.success(AttendanceSuccessMessage.DELETE)
  }
}