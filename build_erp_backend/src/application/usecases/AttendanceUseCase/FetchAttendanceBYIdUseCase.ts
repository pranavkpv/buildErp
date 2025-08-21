import { IFetchAttendanceByIdUseCaseEntity } from "../../interfaces/SitemanagerUseCaseEntities/AttendanceUseCaseEntities/FetchAttendanceBYIdEntity";
import { ResponseHelper } from "../../../Shared/responseHelpers/response";
import { AttendanceFailedMessage, AttendanceSuccessMessage } from "../../../Shared/Messages/Attendance.Message";
import { IAttendanceRepository } from "../../../domain/interfaces/Labour-management/IAttendanceRepository";
import { fetchEditAttendance } from "../../entities/attendance.entity";
import { commonOutput } from "../../dto/common";
import { IAttendanceMapper } from "../../../domain/mappers/IAttendance.mapper";

export class FetchAttendanceByIdUseCase implements IFetchAttendanceByIdUseCaseEntity {
   constructor(
      private attendanceRepository: IAttendanceRepository,
      private attendaneMapper: IAttendanceMapper
   ) { }
   async execute(_id: string): Promise<commonOutput<fetchEditAttendance> | commonOutput> {
      const data = await this.attendanceRepository.findAttendanceById(_id)
      if (!data) return ResponseHelper.conflictData(AttendanceFailedMessage.FETCH)
      const mappedData = this.attendaneMapper.tofetchEditAttendanceDTO(data)
      return ResponseHelper.success(AttendanceSuccessMessage.FETCH, mappedData)
   }
}