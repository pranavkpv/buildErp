import mongoose, { Schema, Document } from "mongoose";
import { Project } from "../domain/types/project";

export interface IProject extends Project, Document {
  _id:string
}

const ProjectSchema: Schema = new Schema(
  {
    project_name: {
      type: String,
      required: true,
    },
    user_id: {
      type: String,
      required: true,
    },
    address:{
      type:String
    },
    mobile_number:{
      type:String
    },
    email:{
      type:String,
      required:true
    },
    description: {
      type: String,
    },
    area:{
      type:Number,
    },
    status: {
      type: String,
      enum: ["pending", "processing", "completed"],
      required:true
    },
    sitemanager_id: {
      type: String,
    },
    start_date: {
      type: String,
    },
    end_date: {
      type: String,
    },
    expected_image: {
      type: String,
    },
    finalImage: {
      type: String,
    },
    budgeted_cost:{
      type:Number
    }
  },
  { timestamps: true }
);

const ProjectModel = mongoose.model<IProject>("Project", ProjectSchema);
export default ProjectModel