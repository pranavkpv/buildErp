import { commonOutput } from '../../dto/common';
import { pageWiseAttendance } from '../../Entities/attendance.entity';
import { listingInput } from '../../Entities/common.entity';

export interface IfetchAttendanceUseCase {
   execute(input: listingInput):
      Promise<commonOutput<{ data: pageWiseAttendance[], totalPage: number }>>
}