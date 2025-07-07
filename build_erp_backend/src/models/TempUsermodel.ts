import mongoose, { Schema,Document } from "mongoose";
import { User } from "../domain/types/user";

export interface ITempUser extends User, Document{
   _id:string,
}

const TempUserSchema:Schema = new Schema({
   username:{
      type:String
   },
   email:{
      type:String
   },
   phone:{
      type:Number
   },
   password:{
      type:String
   },
   otp:{
      type:Number
   },
   otpCreatedAt:{
      type:Date,
      default:Date.now()
   },
   createdAt:{
      type:Date,
      default:Date.now(),
      expires:300
   }
})

const TempUsermodel = mongoose.model<ITempUser>('TempUser',TempUserSchema)
export default TempUsermodel