import mongoose from "mongoose";
import { IReceiveModelEntity } from "../../domain/Entities/modelEntities/recieve.entity";
import { ReceiveSchema } from "../../infrastructure/database/mongoose/schemas/ReceiveSchema";


export interface IReceiveModel extends IReceiveModelEntity { }
export const receiveDB = mongoose.model("receive",ReceiveSchema)