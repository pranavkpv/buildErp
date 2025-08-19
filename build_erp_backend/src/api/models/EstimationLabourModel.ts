import mongoose from "mongoose";
import { IEstimationLabourModelEntity } from "../../domain/Entities/modelEntities/estimationLabour.entity";
import { EstimationLabourSchema } from "../../infrastructure/database/mongoose/schemas/EstimationLabourSchema";

export interface IEstimationLabourModel extends IEstimationLabourModelEntity { }
export const estimationLabourDB = mongoose.model('Estimation_Labour', EstimationLabourSchema)