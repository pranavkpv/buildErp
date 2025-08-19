import mongoose from "mongoose";
import { ISpecModelEntity } from "../../domain/Entities/modelEntities/spec.entity";
import { SpecSchema } from "../../infrastructure/database/mongoose/schemas/SpecSchema";

export interface ISpecModel extends ISpecModelEntity { }
export const specDB = mongoose.model('Spec', SpecSchema)