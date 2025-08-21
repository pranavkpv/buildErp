import { IfetchAttendanceUseCaseEntity } from "../../interfaces/SitemanagerUseCaseEntities/AttendanceUseCaseEntities/FetchAttendanceEntity"
import { ResponseHelper } from "../../../Shared/responseHelpers/response"
import { AttendanceSuccessMessage } from "../../../Shared/Messages/Attendance.Message"
import { IAttendanceRepository } from "../../../domain/interfaces/Labour-management/IAttendanceRepository"
import { listingInput } from "../../entities/common.entity"
import { commonOutput } from "../../dto/common"
import { pageWiseAttendance } from "../../entities/attendance.entity"


export class fetchAttendanceUseCase implements IfetchAttendanceUseCaseEntity {
  
   constructor( 
      private attendanceRepository: IAttendanceRepository
   ) { }
   async execute(input:listingInput): Promise<commonOutput<{data:pageWiseAttendance[],totalPage:number}>> {
      const existAttendance = await this.attendanceRepository.fetchAttendance(input)
      return ResponseHelper.success(AttendanceSuccessMessage.FETCH, existAttendance)
   }
}