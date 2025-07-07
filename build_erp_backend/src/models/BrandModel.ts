import mongoose, { Schema, Document } from "mongoose";
import { Brand } from "../domain/types/brand";

export interface IBrand extends Brand, Document {
  _id:string
}

const BrandSchema: Schema = new Schema({
   brand_name: {
      type: String,
      required: true
   }
},{timestamps:true})

const BrandModel = mongoose.model<IBrand>('Brand', BrandSchema)
export default BrandModel