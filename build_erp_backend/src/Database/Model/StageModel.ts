import mongoose from "mongoose";
import { IStageModelEntity } from "../../Entities/ModelEntities/Stage.Entity";
import { StageSchema } from "../Schema/StageSchema";

export interface IStageModel extends IStageModelEntity { }
export const stageDB = mongoose.model("Stage", StageSchema)