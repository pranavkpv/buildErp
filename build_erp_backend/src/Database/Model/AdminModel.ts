import mongoose from "mongoose";
import { IAdminModelEntity } from "../../Entities/ModelEntities/Admin.Entity";
import { AdminSchema } from "../Schema/AdminSchema";

export interface IAdminModel extends IAdminModelEntity { }
export const adminDB = mongoose.model("Admin",AdminSchema)