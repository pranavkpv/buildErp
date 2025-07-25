import mongoose from "mongoose";
import { IEstimationMaterialModelEntity } from "../../Entities/ModelEntities/EstimationMaterial.Entity";
import { EstimationMaterialSchema } from "../Schema/EstimationMaterialSchema";

export interface IEstimationMaterialModel extends IEstimationMaterialModelEntity { }
export const estimationMaterialDB = mongoose.model('Estimation_material', EstimationMaterialSchema)