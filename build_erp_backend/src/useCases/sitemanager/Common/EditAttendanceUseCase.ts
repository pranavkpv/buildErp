import { IAttendanceRepository } from "../../../domain/repositories/IAttendanceRepository";
import { editAttendanceInput } from "../../../domain/types/attendance";

export class EditAttendanceUseCase {
   private attendanceRepository: IAttendanceRepository
   constructor(attendanceRepository: IAttendanceRepository) {
      this.attendanceRepository = attendanceRepository
   }
   async execute(input: editAttendanceInput) {
      const { editId, selectedProject, selectedDate, row } = input
      const _id = editId
      const project_id = selectedProject
      const date = selectedDate
      const labourDetails = []
      for (let element of row) {
         labourDetails.push({ labour_id: element.labour_type, daily_wage: element.wage, numberOflabour: element.number })
      }
      const existAttendance = await this.attendanceRepository.findExistInEdit(_id, project_id, date)
      if (existAttendance) {
         return {
            success: false,
            message: "Attendance already taken in this project in same days"
         }
      }
      await this.attendanceRepository.UpdateAttendance(_id, project_id, date, labourDetails)
      return {
         success: true,
         message: "attendance updated successfully"
      }
   }
}