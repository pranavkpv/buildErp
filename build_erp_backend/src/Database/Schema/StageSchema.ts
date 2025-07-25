import mongoose from "mongoose";
import { IStageModel } from "../Model/StageModel";

export const StageSchema= new mongoose.Schema<IStageModel>(
   {
      project_id: {
         type: String,
         required: true,
      },
      stage_name: {
         type: String,
         required: true
      },
      start_date: {
         type: String,
      },
      end_date: {
         type: String,
      },
      stage_per: {
         type: Number,
      },
      stage_amount: {
         type: Number,
      },
      stage_image: {
         type: [{date:{type:String},image:[String]}]
      },
      progress:{
         type:Number,
         enum:[0,25,50,75,100]
      },
      status_date:{
         type:String
      }
   },
   { timestamps: true }
);

