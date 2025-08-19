import mongoose from "mongoose";
import { ITempUserModelEntity } from "../../domain/Entities/modelEntities/tempUser.entity";
import { TempUserSchema } from "../../infrastructure/database/mongoose/schemas/TempUserSchema";

export interface ITempUsermodel extends ITempUserModelEntity { }
export const tempUserDB = mongoose.model('TempUser',TempUserSchema)