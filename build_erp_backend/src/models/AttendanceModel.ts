import mongoose, { Schema, Document } from "mongoose";
import { storeAttendance } from "../domain/types/attendance";


export interface LabourDetail {
  labour_id: string;
  daily_wage: number;
  numberOflabour: number;
}

export interface IAttendance extends Document {
   _id:string;
  project_id: string;
  date: string;
  approvalStatus?: boolean;
  labourDetails: LabourDetail[];
}


const AttendanceSchema: Schema = new Schema({
   project_id: {
      type: String,
      required: true
   },
   date:{
      type:String,
      required:true
   },
   approvalStatus:{
      type:Boolean
   },
   labourDetails:[{
      labour_id:{
         type:String
      },
      daily_wage:{
         type:Number
      },
      numberOflabour:{
         type:Number
      }
   }]
},{timestamps:true})

const AttendanceModel = mongoose.model<IAttendance>('Attendance', AttendanceSchema)
export default AttendanceModel