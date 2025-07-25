
import { IAttendanceRepository } from "../../../Entities/repositoryEntities/Labour-management/IAttendanceRepository";
import { IFetchAttendanceByIdUseCase } from "../../../Entities/useCaseEntities/SitemanagerUseCaseEntities/AttendanceUseCaseEntities/FetchAttendanceBYIdEntity";
import { IAttendanceModelEntity } from "../../../Entities/ModelEntities/Attendance.Entity";

export class FetchAttendanceByIdUseCase implements IFetchAttendanceByIdUseCase{
   private attendanceRepository:IAttendanceRepository
   constructor(attendanceRepository:IAttendanceRepository){
      this.attendanceRepository = attendanceRepository
   }
   async execute(_id:string):Promise<IAttendanceModelEntity | null>{

       const data = await this.attendanceRepository.findAttendanceById(_id)
       return data 
   }
}