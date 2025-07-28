
import { IAttendanceRepository } from "../../../Entities/repositoryEntities/Labour-management/IAttendanceRepository";
import { attendanceInput } from "../../../Entities/Input-OutputEntities/LabourEntities/attendance";
import { commonOutput } from "../../../Entities/Input-OutputEntities/CommonEntities/common";
import { IaddAttendanceUseCase } from "../../../Entities/useCaseEntities/SitemanagerUseCaseEntities/AttendanceUseCaseEntities/AddAttendanceEntity";
import { ResponseHelper } from "../../../Shared/utils/response";
import { ERROR_MESSAGE, SUCCESS_MESSAGE } from "../../../Shared/Message";
import { HTTP_STATUS } from "../../../Shared/Status_code";

export class addAttendanceUseCase implements IaddAttendanceUseCase {
   private attendanceRepository: IAttendanceRepository
   constructor(attendanceRepository: IAttendanceRepository) {
      this.attendanceRepository = attendanceRepository
   }
   async execute(input: attendanceInput): Promise<commonOutput> {
      try {
         const { selectedProject, selectedDate, row } = input
         const project_id = selectedProject
         const date = selectedDate
         const labourDetails = []
         for (let element of row) {
            labourDetails.push({ labour_id: element.labour_type, daily_wage: element.wage, numberOflabour: element.number })
         }
         const existAttendance = await this.attendanceRepository.findExistAttendance(project_id, date)
         if (existAttendance) {
            return ResponseHelper.failure(ERROR_MESSAGE.ATTENDANCE.EXIST, HTTP_STATUS.CONFLICT)
         }
         await this.attendanceRepository.SaveAttendance(project_id, date, labourDetails)
         return ResponseHelper.success(SUCCESS_MESSAGE.ATTENDANCE.ADD, HTTP_STATUS.CREATED)
      } catch (error: any) {
         return ResponseHelper.failure(error.message, HTTP_STATUS.INTERNAL_SERVER_ERROR)
      }
   }
}