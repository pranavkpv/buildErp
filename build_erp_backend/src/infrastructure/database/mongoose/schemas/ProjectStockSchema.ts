import mongoose from "mongoose";
import { IProjectStockModel } from "../../../../api/models/ProjectStockModel";

export const StockSchema = new mongoose.Schema<IProjectStockModel>({
   project_id: {
      type: String
   },
   material_id: {
      type: String
   },
    stock: {
      type: Number
   }
},{timestamps:true})

