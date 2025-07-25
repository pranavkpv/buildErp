import { commonOutput } from "../../../Entities/Input-OutputEntities/CommonEntities/common"
import { IAttendanceRepository } from "../../../Entities/repositoryEntities/Labour-management/IAttendanceRepository"
import { IApproveAttendanceUseCase } from "../../../Entities/useCaseEntities/SitemanagerUseCaseEntities/AttendanceUseCaseEntities/ApproveAttendanceEntities"
import { SUCCESS_MESSAGE } from "../../../Shared/Message"
import { HTTP_STATUS } from "../../../Shared/Status_code"
import { ResponseHelper } from "../../../Shared/utils/response"


export class ApproveAttendanceUseCase implements IApproveAttendanceUseCase{
   private attendanceRepository : IAttendanceRepository
   constructor(attendanceRepository : IAttendanceRepository){
      this.attendanceRepository = attendanceRepository
   }
   async execute(_id:string):Promise<commonOutput>{
       await this.attendanceRepository.approveAttendance(_id)
       return ResponseHelper.success(SUCCESS_MESSAGE.ATTENDANCE.APPROVE,HTTP_STATUS.OK)
   }
}