import mongoose from "mongoose";


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


