import mongoose from "mongoose";
import { ILabourModel } from "../Model/LabourModel";

export const LabourSchema = new mongoose.Schema<ILabourModel>({
   labour_type:{
      type:String,
      required:true
   },
   daily_wage:{
      type:Number,
      required:true
   }
},{timestamps:true})
