import { pageWiseAttendance } from "../../../Input-OutputEntities/LabourEntities/attendance";

export interface IfetchAttendanceUseCase{
   execute(search:string,page:number):Promise<{data:pageWiseAttendance | null}>
}