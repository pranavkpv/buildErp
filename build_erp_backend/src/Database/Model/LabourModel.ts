import mongoose from "mongoose";
import { ILabourModelEntity } from "../../Entities/ModelEntities/Labour.Entity";
import { LabourSchema } from "../Schema/LabourSchema";

export interface ILabourModel extends ILabourModelEntity { }
export const labourDB = mongoose.model('Labour', LabourSchema)