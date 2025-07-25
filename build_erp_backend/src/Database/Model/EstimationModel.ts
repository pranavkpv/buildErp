import mongoose from "mongoose";
import { IEstimationModelEntity } from "../../Entities/ModelEntities/Estimation.Entity";
import { EstimationSchema } from "../Schema/EstimationSchema";

export interface IEstimationModel extends IEstimationModelEntity { }
export const estimationDB = mongoose.model('Estimation', EstimationSchema)