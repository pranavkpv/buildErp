import { fetchattendanceData, pageWiseAttendance, storeAttendance, StoreLabour } from "../types/attendance";

export interface IAttendanceRepository{
   SaveAttendance(project_id:string,date:string,labourDetails:StoreLabour[]):Promise<void>
   findExistAttendance(project_id:string,date:string):Promise<storeAttendance | null>
   fetchAttendance(search:string,page:number):Promise<pageWiseAttendance | null>
   deleteAttendance(_id:string):Promise<void>
   approveAttendance(_id:string):Promise<void>
   findAttendanceById(_id:string):Promise<storeAttendance | null>
   findExistInEdit(_id:string,project_id:string,date:string):Promise<storeAttendance | null>
   UpdateAttendance(_id:string,project_id:string,date:string,labourDetails:StoreLabour[]):Promise<void>
}