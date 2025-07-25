import mongoose from "mongoose";
import { ISpecModelEntity } from "../../Entities/ModelEntities/Spec.Entity";
import { SpecSchema } from "../Schema/SpecSchema";

export interface ISpecModel extends ISpecModelEntity { }
export const specDB = mongoose.model('Spec', SpecSchema)