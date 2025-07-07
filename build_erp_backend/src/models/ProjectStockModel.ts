import mongoose, { Schema, Document } from "mongoose";
import { ProjectStock } from "../domain/types/material";

export interface IStock extends ProjectStock, Document {
   _id:string
}

const StockSchema: Schema = new Schema({
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

 const ProjectStockModel = mongoose.model<IStock>('Stock', StockSchema)
 export default ProjectStockModel