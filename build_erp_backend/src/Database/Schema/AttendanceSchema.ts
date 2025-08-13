import mongoose from "mongoose"
import { IAttendanceModel } from "../Model/AttendanceModel"


export const AttendanceSchema = new mongoose.Schema<IAttendanceModel>({
   project_id: {
      type: String,
      required: true
   },
   date:{
      type:Date,
      required:true
   },
   approvalStatus:{
      type:Boolean,
      required:true
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
