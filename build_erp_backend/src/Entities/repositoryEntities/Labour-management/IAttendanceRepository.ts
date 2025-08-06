import { pageWiseAttendance, StoreLabour } from "../../Input-OutputEntities/LabourEntities/attendance"
import { IAttendanceModelEntity } from "../../ModelEntities/Attendance.Entity"


export interface IAttendanceRepository{
   SaveAttendance(project_id:string,date:string,labourDetails:StoreLabour[]):Promise<void>
   findExistAttendance(project_id:string,date:string):Promise<IAttendanceModelEntity | null>
   fetchAttendance(search:string,page:number):Promise<pageWiseAttendance | null>
   deleteAttendance(_id:string):Promise<void>
   approveAttendance(_id:string):Promise<void>
   findAttendanceById(_id:string):Promise<IAttendanceModelEntity | null>
   findExistInEdit(_id:string,project_id:string,date:string):Promise<IAttendanceModelEntity | null>
   UpdateAttendance(_id:string,project_id:string,date:string,labourDetails:StoreLabour[]):Promise<void>
   findAllAttendance():Promise<IAttendanceModelEntity[]>
}