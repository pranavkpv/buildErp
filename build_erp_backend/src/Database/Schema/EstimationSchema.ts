import mongoose from "mongoose";
import { IEstimationModel } from "../Model/EstimationModel";

export const EstimationSchema = new mongoose.Schema<IEstimationModel>({
   spec_id:{
      type:String,
      required:true
   },
   quantity:{
      type:Number,
      required:true
   },
   unit_rate:{
      type:Number,
      required:true
   },
   project_id:{
      type:String,
      required:true
   }
},{timestamps:true})

