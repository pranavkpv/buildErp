import mongoose from "mongoose";
import { IMaterialModelEntity } from "../../domain/Entities/modelEntities/material.entity";
import { MaterialSchema } from "../../infrastructure/database/mongoose/schemas/MaterialSchema";

export interface IMaterialModel extends IMaterialModelEntity { }
export const materialDB = mongoose.model('Material', MaterialSchema)