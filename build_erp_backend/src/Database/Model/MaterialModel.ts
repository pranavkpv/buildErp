import mongoose from "mongoose";
import { IMaterialModelEntity } from "../../Entities/ModelEntities/Material.Entity";
import { MaterialSchema } from "../Schema/MaterialSchema";

export interface IMaterialModel extends IMaterialModelEntity { }
export const materialDB = mongoose.model('Material', MaterialSchema)