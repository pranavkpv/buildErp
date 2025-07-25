import mongoose from "mongoose";
import { ISitemanagerModel } from "../Model/SitemanagerModel";


export const SitemanagerSchema = new mongoose.Schema<ISitemanagerModel>({
   username:{
      type:String,
      required:true
   },
   email:{
      type:String,
      required:true
   },
   password:{
      type:String,
      required:true
   }
},{timestamps:true})

