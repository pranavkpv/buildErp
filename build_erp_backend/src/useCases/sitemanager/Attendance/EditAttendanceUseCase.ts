
import { IAttendanceRepository } from "../../../Entities/repositoryEntities/Labour-management/IAttendanceRepository";
import { editAttendanceInput } from "../../../Entities/Input-OutputEntities/LabourEntities/attendance";
import { commonOutput } from "../../../Entities/Input-OutputEntities/CommonEntities/common";
import { IEditAttendanceUseCase } from "../../../Entities/useCaseEntities/SitemanagerUseCaseEntities/AttendanceUseCaseEntities/EditAttendanceEntity";
import { ResponseHelper } from "../../../Shared/utils/response";
import { ERROR_MESSAGE, SUCCESS_MESSAGE } from "../../../Shared/Message";
import { HTTP_STATUS } from "../../../Shared/Status_code";

export class EditAttendanceUseCase implements IEditAttendanceUseCase {
   private attendanceRepository: IAttendanceRepository
   constructor(attendanceRepository: IAttendanceRepository) {
      this.attendanceRepository = attendanceRepository
   }
   async execute(input: editAttendanceInput): Promise<commonOutput> {
      try {
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
            return ResponseHelper.failure(ERROR_MESSAGE.ATTENDANCE.EXIST, HTTP_STATUS.CONFLICT)
         }
         await this.attendanceRepository.UpdateAttendance(_id, project_id, date, labourDetails)
         return ResponseHelper.success(SUCCESS_MESSAGE.ATTENDANCE.UPDATE, HTTP_STATUS.OK)
      } catch (error: any) {
         return ResponseHelper.failure(error.message, HTTP_STATUS.INTERNAL_SERVER_ERROR)
      }
   }
}