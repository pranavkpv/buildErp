import { commonOutput } from '../../dto/common';
import { pageWiseAttendance } from '../../entities/attendance.entity';
import { listingInput } from '../../entities/common.entity';

export interface IfetchAttendanceUseCase {
   execute(input: listingInput):
      Promise<commonOutput<{ data: pageWiseAttendance[], totalPage: number }>>
}