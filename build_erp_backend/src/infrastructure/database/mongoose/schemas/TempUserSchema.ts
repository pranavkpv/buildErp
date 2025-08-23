import mongoose from "mongoose";
import { ITempUsermodel } from "../../../../api/models/TempUsermodel";

export const TempUserSchema = new mongoose.Schema<ITempUsermodel>({
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
})

