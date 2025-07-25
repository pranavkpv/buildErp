import mongoose from "mongoose";
import { ICategoryModelEntity } from "../../Entities/ModelEntities/Category.Entity";
import { CategorySchema } from "../Schema/CategorySchema";

export interface ICategoryModel extends ICategoryModelEntity { }
export const categoryDB = mongoose.model('Category', CategorySchema)