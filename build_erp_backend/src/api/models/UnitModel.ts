import mongoose from "mongoose";
import { IUnitModelEntity } from "../../domain/Entities/modelEntities/unit.entity";
import { UnitSchema } from "../../infrastructure/database/mongoose/schemas/UnitSchema";

export interface IUnitModel extends IUnitModelEntity { }
export const unitDB = mongoose.model('Unit', UnitSchema)