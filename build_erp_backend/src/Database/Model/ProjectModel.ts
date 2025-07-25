import mongoose from "mongoose";
import { IProjectModelEntity } from "../../Entities/ModelEntities/ProjectEntity";
import { ProjectSchema } from "../Schema/ProjectSchema";

export interface IProjectModel extends IProjectModelEntity { }
export const projectDB = mongoose.model("Project", ProjectSchema)