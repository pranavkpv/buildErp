import mongoose from "mongoose";
import { IProjectModelEntity } from "../../domain/Entities/modelEntities/project.entity";
import { ProjectSchema } from "../../infrastructure/database/mongoose/schemas/ProjectSchema";

export interface IProjectModel extends IProjectModelEntity { }
export const projectDB = mongoose.model("Project", ProjectSchema)