import mongoose from "mongoose";
import { IEstimationAdditionalModalEntity } from "../../domain/Entities/modelEntities/estimationAdditional.entity";
import { EstimationAdditionalSchema } from "../../infrastructure/database/mongoose/schemas/EstimationAdditionalSchema";

export interface IEstimationAdditionalModel extends IEstimationAdditionalModalEntity { }
export const estimationAdditionalDB = mongoose.model('Estimation_additional', EstimationAdditionalSchema)