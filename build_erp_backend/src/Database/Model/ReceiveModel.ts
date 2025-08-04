import mongoose from "mongoose";
import { IReceiveModelEntity } from "../../Entities/ModelEntities/Recieve.Entity";
import { ReceiveSchema } from "../Schema/ReceiveSchema";


export interface IReceiveModel extends IReceiveModelEntity { }
export const receiveDB = mongoose.model("receive",ReceiveSchema)