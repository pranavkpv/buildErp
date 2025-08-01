import mongoose from "mongoose"
import { IBrandModel } from "../Model/BrandModel"

export const BrandSchema = new mongoose.Schema<IBrandModel>({
   brand_name: {
      type: String,
      required: true
   }
},{timestamps:true})
