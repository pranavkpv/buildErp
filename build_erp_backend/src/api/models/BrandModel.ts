import mongoose from "mongoose";
import { IBrandModelEntity } from "../../domain/Entities/modelEntities/brand.entity";
import { BrandSchema } from "../../infrastructure/database/mongoose/schemas/BrandSchema";

export interface IBrandModel extends IBrandModelEntity { }
export const  brandDB = mongoose.model('Brand', BrandSchema)