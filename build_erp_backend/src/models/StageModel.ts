import mongoose, { Schema, Document } from "mongoose";


export interface IStageImageEntry {
  date: string;
  image: string[];
} 
export interface IStage extends Document {
   project_id: string;
   stage_name: string;
   start_date: string;
   end_date: string;
   stage_per: number;
   stage_amount: number;
   stage_image?: IStageImageEntry[];
   status:string,
   status_date:string
}

const StageSchema: Schema = new Schema(
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

const StageModel = mongoose.model<IStage>("Stage", StageSchema);
export default StageModel