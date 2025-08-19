import mongoose from "mongoose";
import { ILabourModelEntity } from "../../domain/Entities/modelEntities/labour.entity";
import { LabourSchema } from "../../infrastructure/database/mongoose/schemas/LabourSchema";

export interface ILabourModel extends ILabourModelEntity { }
export const labourDB = mongoose.model('Labour', LabourSchema)