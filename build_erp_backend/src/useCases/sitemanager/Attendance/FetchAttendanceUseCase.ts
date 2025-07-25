import { pageWiseAttendance } from "../../../Entities/Input-OutputEntities/LabourEntities/attendance"
import { IAttendanceRepository } from "../../../Entities/repositoryEntities/Labour-management/IAttendanceRepository"
import { IfetchAttendanceUseCase } from "../../../Entities/useCaseEntities/SitemanagerUseCaseEntities/AttendanceUseCaseEntities/FetchAttendanceEntity"


export class fetchAttendanceUseCase implements IfetchAttendanceUseCase{
   private attendanceRepository : IAttendanceRepository
   constructor(attendanceRepository : IAttendanceRepository){
      this.attendanceRepository = attendanceRepository
   }
   async execute(search:string,page:number):Promise<{data:pageWiseAttendance | null}>{
      const existAttendance = await this.attendanceRepository.fetchAttendance(search,page)
      return {
         data:existAttendance
      }
   }
}