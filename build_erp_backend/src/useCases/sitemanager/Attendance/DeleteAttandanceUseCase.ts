import { commonOutput } from "../../../Entities/Input-OutputEntities/CommonEntities/common"
import { IAttendanceRepository } from "../../../Entities/repositoryEntities/Labour-management/IAttendanceRepository"
import { IDeleteAttendanceUseCase } from "../../../Entities/useCaseEntities/SitemanagerUseCaseEntities/AttendanceUseCaseEntities/DeleteAttendanceEntity"
import { SUCCESS_MESSAGE } from "../../../Shared/Message"
import { HTTP_STATUS } from "../../../Shared/Status_code"
import { ResponseHelper } from "../../../Shared/utils/response"


export class DeleteAttendanceUseCase implements IDeleteAttendanceUseCase{
   private attendanceRepository : IAttendanceRepository
   constructor(attendanceRepository : IAttendanceRepository){
      this.attendanceRepository = attendanceRepository
   }
   async execute(_id:string):Promise<commonOutput>{
     try {
       await this.attendanceRepository.deleteAttendance(_id)
      return ResponseHelper.success(SUCCESS_MESSAGE.ATTENDANCE.DELETE,HTTP_STATUS.OK)
     } catch (error:any) {
       return ResponseHelper.failure(error.message, HTTP_STATUS.INTERNAL_SERVER_ERROR)
     }
   }
}