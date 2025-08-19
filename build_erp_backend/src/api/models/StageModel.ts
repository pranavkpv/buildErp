import mongoose from "mongoose";
import { IStageModelEntity } from "../../domain/Entities/modelEntities/stage.entity";
import { StageSchema } from "../../infrastructure/database/mongoose/schemas/StageSchema";

export interface IStageModel extends IStageModelEntity { }
export const stageDB = mongoose.model("Stage", StageSchema)