import mongoose, { Schema, Document } from "mongoose";


export interface IEstimationAdditional extends  Document {
  _id:string
}

const EstimationAdditionalSchema: Schema = new Schema({
   additionalExpense_per:{
      type:String,

   },
   additionalExpense_amount:{
      type:Number,

   },
   profit_per:{
      type:Number,

   },
   profit_amount:{
      type:String,

   },
   project_id:{
      type:String
   }
},{timestamps:true})

const EstimationAdditionalModel =  mongoose.model<IEstimationAdditional>('Estimation_additional', EstimationAdditionalSchema)
export default EstimationAdditionalModel