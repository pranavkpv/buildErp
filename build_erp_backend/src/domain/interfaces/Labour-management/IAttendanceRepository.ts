import { InputAttendance, pageWiseAttendance } from "../../../application/entities/attendance.entity"
import { listingInput } from "../../../application/entities/common.entity"
import { IAttendanceModelEntity } from "../../Entities/modelEntities/attendance.entity"


export interface IAttendanceRepository{
   SaveAttendance(input:InputAttendance):Promise<void>
   findExistAttendance(project_id:string,date:string):Promise<IAttendanceModelEntity | null>
   fetchAttendance(input:listingInput):Promise<{data:pageWiseAttendance[],totalPage:number}>
   deleteAttendance(_id:string):Promise<void>
   approveAttendance(_id:string):Promise<void>
   findAttendanceById(_id:string):Promise<IAttendanceModelEntity | null>
   findExistInEdit(_id:string,project_id:string,date:string):Promise<IAttendanceModelEntity | null>
   UpdateAttendance(input:InputAttendance):Promise<void>
   findAllAttendance():Promise<IAttendanceModelEntity[]>
}