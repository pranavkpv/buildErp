import { commonOutput } from "../../DTO/CommonEntities/common"
import { IDeleteAttendanceUseCaseEntity } from "../../Entities/useCaseEntities/SitemanagerUseCaseEntities/AttendanceUseCaseEntities/DeleteAttendanceEntity"
import { ResponseHelper } from "../../Shared/ResponseHelper/response"
import { IAttendanceRepositoryEntity } from "../../Entities/repositoryEntities/Labour-management/IAttendanceRepository"
import { AttendanceSuccessMessage } from "../../Shared/Messages/Attendance.Message"


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