import mongoose from "mongoose";
import { IEstimationMaterialModelEntity } from "../../domain/Entities/modelEntities/estimationMaterial.entity";
import { EstimationMaterialSchema } from "../../infrastructure/database/mongoose/schemas/EstimationMaterialSchema";

export interface IEstimationMaterialModel extends IEstimationMaterialModelEntity { }
export const estimationMaterialDB = mongoose.model('Estimation_material', EstimationMaterialSchema)