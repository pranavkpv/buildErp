import { editAttendanceInput } from "../../DTO/LabourEntities/attendance";
import { commonOutput } from "../../DTO/CommonEntities/common";
import { IEditAttendanceUseCaseEntity } from "../../Entities/useCaseEntities/SitemanagerUseCaseEntities/AttendanceUseCaseEntities/EditAttendanceEntity";
import { ResponseHelper } from "../../Shared/ResponseHelper/response";
import { HTTP_STATUS } from "../../Shared/Status_code";
import { IAttendanceRepositoryEntity } from "../../Entities/repositoryEntities/Labour-management/IAttendanceRepository";
import { AttendanceFailedMessage, AttendanceSuccessMessage } from "../../Shared/Messages/Attendance.Message";

export class EditAttendanceUseCase implements IEditAttendanceUseCaseEntity {
   private attendanceRepository: IAttendanceRepositoryEntity
   constructor(attendanceRepository: IAttendanceRepositoryEntity) {
      this.attendanceRepository = attendanceRepository
   }
   async execute(input: editAttendanceInput): Promise<commonOutput> {
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
         return ResponseHelper.conflictData(AttendanceFailedMessage.EXIST)
      }
      await this.attendanceRepository.UpdateAttendance({ _id, project_id, date, labourDetails })
      return ResponseHelper.success(AttendanceSuccessMessage.UPDATE)
   }
}