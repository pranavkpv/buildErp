import mongoose from "mongoose";
import { IProjectModel } from "../Model/ProjectModel";



export const ProjectSchema = new mongoose.Schema<IProjectModel>(
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
      type:Number
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

