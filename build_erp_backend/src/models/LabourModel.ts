import mongoose, { Schema, Document } from "mongoose";
import { Labour } from "../domain/types/labour";

export interface ILabour extends Labour, Document {
  _id:string
}

const LabourSchema: Schema = new Schema({
   labour_type:{
      type:String,
      required:true
   },
   daily_wage:{
      type:Number,
      required:true
   }
},{timestamps:true})

const LabourModel =  mongoose.model<ILabour>('Labour', LabourSchema)
export default LabourModel