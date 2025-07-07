
import mongoose, { Schema, Document } from "mongoose"
import { User } from "../domain/types/user";

export interface IUser extends User, Document {
   _id: string;
   username:string,
   email:string,
   phone:number,
   password:string,
   profile_image:string

}

const userSchema: Schema = new Schema({
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
      required: true,
      unique: true
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

const UserModel = mongoose.model<IUser>('user', userSchema)
export default UserModel