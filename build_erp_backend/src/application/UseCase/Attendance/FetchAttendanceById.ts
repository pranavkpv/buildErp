import { IFetchAttendanceByIdUseCase } from '../../IUseCases/IAttendance/IFetchAttendanceById';
import { ResponseHelper } from '../../../Shared/responseHelpers/response';
import { AttendanceFailedMessage, AttendanceSuccessMessage } from '../../../Shared/Messages/Attendance.Message';
import { IAttendanceRepository } from '../../../domain/Entities/IRepository/IAttendance';
import { fetchEditAttendance } from '../../Entities/attendance.entity';
import { commonOutput } from '../../dto/common';
import { IAttendanceMapper } from '../../../domain/mappers/IAttendance.mapper';

export class FetchAttendanceByIdUseCase implements IFetchAttendanceByIdUseCase {
    constructor(
      private _attendanceRepository: IAttendanceRepository,
      private _attendaneMapper: IAttendanceMapper,
    ) { }
    async execute(id: string): Promise<commonOutput<fetchEditAttendance> | commonOutput> {
        const data = await this._attendanceRepository.getAttendanceById(id);
        if (!data) return ResponseHelper.conflictData(AttendanceFailedMessage.FETCH);
        const mappedData = this._attendaneMapper.tofetchEditAttendanceDTO(data);
        return ResponseHelper.success(AttendanceSuccessMessage.FETCH, mappedData);
    }
}