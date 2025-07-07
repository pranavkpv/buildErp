import { IAttendanceRepository } from "../../../domain/repositories/IAttendanceRepository";
import { storeAttendance } from "../../../domain/types/attendance";

export class FetchAttendanceByIdUseCase{
   private attendanceRepository:IAttendanceRepository
   constructor(attendanceRepository:IAttendanceRepository){
      this.attendanceRepository = attendanceRepository
   }
   async execute(_id:string):Promise<storeAttendance | null>{

       const data = await this.attendanceRepository.findAttendanceById(_id)
       return data ? data : null
   }
}