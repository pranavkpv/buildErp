import mongoose from "mongoose";
import { IBrandModelEntity } from "../../Entities/ModelEntities/Brand.Entity";
import { BrandSchema } from "../Schema/BrandSchema";

export interface IBrandModel extends IBrandModelEntity { }
export const  brandDB = mongoose.model('Brand', BrandSchema)