import { IAttendanceRepository } from "../../../domain/repositories/IAttendanceRepository";

export class DeleteAttendanceUseCase{
   private attendanceRepository : IAttendanceRepository
   constructor(attendanceRepository : IAttendanceRepository){
      this.attendanceRepository = attendanceRepository
   }
   async execute(_id:string){
      await this.attendanceRepository.deleteAttendance(_id)
      return {
         success:true,
         message:"attendance deleted successfully"
      }
   }
}