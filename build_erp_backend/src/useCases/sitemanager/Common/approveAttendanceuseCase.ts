import { IAttendanceRepository } from "../../../domain/repositories/IAttendanceRepository";

export class ApproveAttendanceUseCase{
   private attendanceRepository : IAttendanceRepository
   constructor(attendanceRepository : IAttendanceRepository){
      this.attendanceRepository = attendanceRepository
   }
   async execute(_id:string){
       await this.attendanceRepository.approveAttendance(_id)
       return {
         success:true,
         message:"attendance approved successfully"
      }
   }
}