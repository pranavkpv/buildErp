import mongoose, { Schema,Document } from "mongoose";
import { Admin } from "../domain/types/admin";

export interface IAdmin extends Admin, Document{
  _id:string
}

const AdminSchema:Schema = new Schema({
   username:{
      type:String
   },
   password:{
      type:String
   }
})

 const AdminModel = mongoose.model<IAdmin>('Admin',AdminSchema)
 export default AdminModel