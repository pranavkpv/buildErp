import mongoose from "mongoose";
import { IEstimationLabourModelEntity } from "../../Entities/ModelEntities/EstimationLabour.Entity";
import { EstimationLabourSchema } from "../Schema/EstimationLabourSchema";

export interface IEstimationLabourModel extends IEstimationLabourModelEntity { }
export const estimationLabourDB = mongoose.model('Estimation_Labour', EstimationLabourSchema)