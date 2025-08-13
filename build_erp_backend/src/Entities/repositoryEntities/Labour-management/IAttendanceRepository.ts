import { listingInput } from "../../../DTO/CommonEntities/common"
import { InputAttendance, pageWiseAttendance } from "../../../DTO/LabourEntities/attendance"
import { IAttendanceModelEntity } from "../../ModelEntities/Attendance.Entity"


export interface IAttendanceRepositoryEntity{
   SaveAttendance(input:InputAttendance):Promise<void>
   findExistAttendance(project_id:string,date:string):Promise<IAttendanceModelEntity | null>
   fetchAttendance(input:listingInput):Promise<pageWiseAttendance | null>
   deleteAttendance(_id:string):Promise<void>
   approveAttendance(_id:string):Promise<void>
   findAttendanceById(_id:string):Promise<IAttendanceModelEntity | null>
   findExistInEdit(_id:string,project_id:string,date:string):Promise<IAttendanceModelEntity | null>
   UpdateAttendance(input:InputAttendance):Promise<void>
   findAllAttendance():Promise<IAttendanceModelEntity[]>
}