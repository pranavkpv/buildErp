import mongoose from "mongoose";
import { IProjectStockModel } from "../Model/ProjectStockModel";

export const StockSchema = new mongoose.Schema<IProjectStockModel>({
   project_id: {
      type: String
   },
   material_id: {
      type: String
   },
    stock: {
      type: String
   }
},{timestamps:true})

