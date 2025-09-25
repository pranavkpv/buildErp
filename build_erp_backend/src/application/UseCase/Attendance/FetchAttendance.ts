import { IfetchAttendanceUseCase } from '../../IUseCases/IAttendance/IFetchAttendance';
import { ResponseHelper } from '../../../Shared/responseHelpers/response';
import { AttendanceSuccessMessage } from '../../../Shared/Messages/Attendance.Message';
import { IAttendanceRepository } from '../../../domain/Entities/IRepository/IAttendance';
import { listingInput } from '../../entities/common.entity';
import { commonOutput } from '../../dto/common';
import { pageWiseAttendance } from '../../entities/attendance.entity';


export class FetchAttendanceUseCase implements IfetchAttendanceUseCase {

    constructor(
      private _attendanceRepository: IAttendanceRepository,
    ) { }
    async execute(input: listingInput):
      Promise<commonOutput<{ data: pageWiseAttendance[], totalPage: number }>> {
        const existAttendance = await this._attendanceRepository.getPendingAttendanceList(input);
        return ResponseHelper.success(AttendanceSuccessMessage.FETCH, existAttendance);
    }
}