import mongoose from "mongoose";
import { IEstimationMaterialModel } from "../../../../api/models/EstimationMaterialModel";

export const EstimationMaterialSchema = new mongoose.Schema<IEstimationMaterialModel>({
   material_id:{
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

