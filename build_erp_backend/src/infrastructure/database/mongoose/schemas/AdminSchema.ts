import mongoose, { Schema,Document } from "mongoose";
import { IAdminModel } from "../../../../api/models/AdminModel";


export const AdminSchema = new mongoose.Schema<IAdminModel> ({
   username:{
      type:String
   },
   password:{
      type:String
   }
})

