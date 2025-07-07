import mongoose, { Schema, Document } from "mongoose";
import { Sitemanager } from "../domain/types/sitemanager";

export interface ISitemanager extends Sitemanager, Document {
   _id:string
}

const SitemanagerSchema: Schema = new Schema({
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

const SitemanagerModel = mongoose.model<ISitemanager>('Sitemanager', SitemanagerSchema)
export default SitemanagerModel