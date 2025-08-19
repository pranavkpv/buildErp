import mongoose from "mongoose"
import { IUsermodel } from "../../../../api/models/Usermodel";

export const userSchema = new mongoose.Schema<IUsermodel>({
   username: {
      type: String,
      required: true
   },
   email: {
      type: String,
      required: true,
      unique: true
   },
   phone: {
      type: Number,
   },
   password: {
      type: String,
      required: true
   },
   profile_image: {
      type: String
   },
   googleId:{
      type:String
   }

}, { timestamps: true })
