import mongoose from "mongoose";
import { IProjectStockModelEntity } from "../../domain/Entities/modelEntities/projectStock.entity";
import { StockSchema } from "../../infrastructure/database/mongoose/schemas/ProjectStockSchema";

export interface IProjectStockModel extends IProjectStockModelEntity { }
export const projectStockDB = mongoose.model('Stock', StockSchema)