import mongoose from "mongoose";
import { ITempUserModelEntity } from "../../Entities/ModelEntities/TempUser.Entity";
import { TempUserSchema } from "../Schema/TempUserSchema";

export interface ITempUsermodel extends ITempUserModelEntity { }
export const tempUserDB = mongoose.model('TempUser',TempUserSchema)