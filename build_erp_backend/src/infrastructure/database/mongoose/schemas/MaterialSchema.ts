import mongoose from "mongoose";
import { IMaterialModel } from "../../../../api/models/MaterialModel";

export const MaterialSchema = new mongoose.Schema<IMaterialModel>({
   material_name: {
      type: String,
      required: true
   },
   category_id: {
      type: String,
      required:true
   },
    brand_id: {
      type: String,
      required:true
   },
   unit_id:{
      type:String,
      required:true
   },
    unit_rate: {
      type: Number,
      required:true
   },
   stock: {
      type: Number,
      required:true
   }
},{timestamps:true})

