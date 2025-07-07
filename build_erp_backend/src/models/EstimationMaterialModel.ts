import mongoose, { Schema, Document } from "mongoose";
import { Labour } from "../domain/types/labour";

export interface IEstimationMaterial extends  Document {
  _id:string
}

const EstimationMaterialSchema: Schema = new Schema({
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

const EstimationMaterialModel =  mongoose.model<IEstimationMaterial>('Estimation_material', EstimationMaterialSchema)
export default EstimationMaterialModel