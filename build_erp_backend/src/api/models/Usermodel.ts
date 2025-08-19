import mongoose from "mongoose";
import { IUserModelEntity } from "../../domain/Entities/modelEntities/user.entity";
import { userSchema } from "../../infrastructure/database/mongoose/schemas/UserSchema";

export interface IUsermodel extends IUserModelEntity { }
export const userDB = mongoose.model('user', userSchema)
