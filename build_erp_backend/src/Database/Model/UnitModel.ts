import mongoose from "mongoose";
import { IUnitModelEntity } from "../../Entities/ModelEntities/Unit.Entity";
import { UnitSchema } from "../Schema/UnitSchema";

export interface IUnitModel extends IUnitModelEntity { }
export const unitDB = mongoose.model('Unit', UnitSchema)