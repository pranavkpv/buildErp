import mongoose from "mongoose";
import { IUserModelEntity } from "../../Entities/ModelEntities/User.Entity";
import { userSchema } from "../Schema/UserSchema";

export interface IUsermodel extends IUserModelEntity { }
export const userDB = mongoose.model('user', userSchema)
