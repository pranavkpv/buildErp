import mongoose from "mongoose";
import { ICategoryModelEntity } from "../../domain/Entities/modelEntities/category.entity";
import { CategorySchema } from "../../infrastructure/database/mongoose/schemas/CategorySchema";

export interface ICategoryModel extends ICategoryModelEntity { }
export const categoryDB = mongoose.model('Category', CategorySchema)