import mongoose from "mongoose";
import { IEstimationAdditionalModalEntity } from "../../Entities/ModelEntities/EstimationAdditional.Entity";
import { EstimationAdditionalSchema } from "../Schema/EstimationAdditionalSchema";

export interface IEstimationAdditionalModel extends IEstimationAdditionalModalEntity { }
export const estimationAdditionalDB = mongoose.model('Estimation_additional', EstimationAdditionalSchema)