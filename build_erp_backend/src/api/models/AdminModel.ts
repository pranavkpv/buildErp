import mongoose from "mongoose";
import { IAdminModelEntity } from "../../domain/Entities/modelEntities/admin.entity";
import { AdminSchema } from "../../infrastructure/database/mongoose/schemas/AdminSchema";

export interface IAdminModel extends IAdminModelEntity { }
export const adminDB = mongoose.model("Admin",AdminSchema)