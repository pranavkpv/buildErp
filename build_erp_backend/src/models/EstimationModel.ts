import mongoose, { Schema, Document } from "mongoose";


export interface IEstimation extends  Document {
  _id:string
  spec_id:string
  quantity:number
  unit_rate:number
  project_id:string
}

const EstimationSchema: Schema = new Schema({
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

const EstimationModel =  mongoose.model<IEstimation>('Estimation', EstimationSchema)
export default EstimationModel