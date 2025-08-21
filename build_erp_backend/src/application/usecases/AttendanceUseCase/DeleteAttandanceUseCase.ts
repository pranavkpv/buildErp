
import { IDeleteAttendanceUseCaseEntity } from "../../interfaces/SitemanagerUseCaseEntities/AttendanceUseCaseEntities/DeleteAttendanceEntity"
import { ResponseHelper } from "../../../Shared/responseHelpers/response"
import { AttendanceSuccessMessage } from "../../../Shared/Messages/Attendance.Message"
import { IAttendanceRepository } from "../../../domain/interfaces/Labour-management/IAttendanceRepository"
import { commonOutput } from "../../dto/common"


export class DeleteAttendanceUseCase implements IDeleteAttendanceUseCaseEntity {
 
  constructor( private attendanceRepository: IAttendanceRepository) {
    this.attendanceRepository = attendanceRepository
  }
  async execute(_id: string): Promise<commonOutput> {
    await this.attendanceRepository.deleteAttendance(_id)
    return ResponseHelper.success(AttendanceSuccessMessage.DELETE)
  }
}