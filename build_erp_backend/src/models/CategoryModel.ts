import mongoose, { Schema, Document } from "mongoose";
import { Category } from "../domain/types/category";

export interface ICategory extends Category, Document {
   _id:string
}

const CategorySchema: Schema = new Schema({
   category_name: {
      type: String,
      required: true
   },
   description: {
      type: String
   }
},{timestamps:true})

 const CategoryModel=mongoose.model<ICategory>('Category', CategorySchema)
 export default CategoryModel