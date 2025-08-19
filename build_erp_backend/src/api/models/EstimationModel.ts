import mongoose from "mongoose";
import { IEstimationModelEntity } from "../../domain/Entities/modelEntities/estimation.entity";
import { EstimationSchema } from "../../infrastructure/database/mongoose/schemas/EstimationSchema";

export interface IEstimationModel extends IEstimationModelEntity { }
export const estimationDB = mongoose.model('Estimation', EstimationSchema)