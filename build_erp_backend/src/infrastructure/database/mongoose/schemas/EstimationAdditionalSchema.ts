import mongoose from "mongoose";
import { IEstimationAdditionalModel } from "../../../../api/models/EstimationAdditionalModel";

export const EstimationAdditionalSchema = new mongoose.Schema<IEstimationAdditionalModel>({
   additionalExpense_per:{
      type:Number,

   },
   additionalExpense_amount:{
      type:Number,

   },
   profit_per:{
      type:Number,

   },
   profit_amount:{
      type:Number,

   },
   project_id:{
      type:String
   }
},{timestamps:true})
