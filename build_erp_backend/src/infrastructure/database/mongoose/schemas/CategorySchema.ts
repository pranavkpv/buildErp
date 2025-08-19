import mongoose from "mongoose";
import { ICategoryModel } from "../../../../api/models/CategoryModel";

export const CategorySchema = new mongoose.Schema<ICategoryModel>({
   category_name: {
      type: String,
      required: true
   },
   description: {
      type: String
   }
},{timestamps:true})
