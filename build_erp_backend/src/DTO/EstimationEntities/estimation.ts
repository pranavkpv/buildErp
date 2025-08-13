import mongoose from "mongoose";
import { IEstimationModelEntity } from "../../Entities/ModelEntities/Estimation.Entity";


export interface rowData {
   spec_id: string
   spec_name: string,
   unitrate: number,
   quantity: number,
   total: number
}


export interface SpecData {
  _id: string; 
  budgeted_cost: number;
  projectObjectId: mongoose.Types.ObjectId;
  projectDetails: any[]; 
}

export interface EstimationData{
   _id:string,
   spec_id: string
   quantity: number,
   unit_rate:number,
   project_id:string,
   specDetails?:SpecData
}


export interface estimationOutput {
   success?:boolean
   message?:string
   status_code?:number
   data:IEstimationModelEntity | IEstimationModelEntity[] | SpecData []
   totalPage?:number
}


