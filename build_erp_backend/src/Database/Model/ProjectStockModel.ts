import mongoose from "mongoose";
import { IProjectStockModelEntity } from "../../Entities/ModelEntities/ProjectStock.Entity";
import { StockSchema } from "../Schema/ProjectStockSchema";

export interface IProjectStockModel extends IProjectStockModelEntity { }
export const projectStockDB = mongoose.model('Stock', StockSchema)