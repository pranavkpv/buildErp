import { IAttendanceRepository } from "../../../domain/repositories/IAttendanceRepository";
import { attendanceInput } from "../../../domain/types/attendance";

export class addAttendanceUseCase{
   private attendanceRepository : IAttendanceRepository
   constructor(attendanceRepository : IAttendanceRepository){
      this.attendanceRepository = attendanceRepository
   }
   async execute(input:attendanceInput){
       const {selectedProject,selectedDate,row} = input
       const project_id = selectedProject
       const date = selectedDate
       const labourDetails = []
       for(let element of row){
         labourDetails.push({labour_id:element.labour_type,daily_wage:element.wage,numberOflabour:element.number})
       }
       const existAttendance = await this.attendanceRepository.findExistAttendance(project_id,date)
      if(existAttendance){
         return{
            success:false,
            message:"Attendance already taken in this project in same days"
         }
      }
      await this.attendanceRepository.SaveAttendance(project_id,date,labourDetails)
      return {
         success:true,
         message:"attendance take successfully"
      }
   }
}