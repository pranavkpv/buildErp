import { IAttendanceRepository } from "../../../domain/repositories/IAttendanceRepository"

export class fetchAttendanceUseCase{
   private attendanceRepository : IAttendanceRepository
   constructor(attendanceRepository : IAttendanceRepository){
      this.attendanceRepository = attendanceRepository
   }
   async execute(search:string,page:number){
      const existAttendance = await this.attendanceRepository.fetchAttendance(search,page)
      return {
         data:existAttendance
      }
   }
}