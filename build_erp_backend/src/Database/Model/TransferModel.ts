import mongoose from "mongoose";
import { ITransferModelEntity } from "../../Entities/ModelEntities/Transfer.Entity";
import { TransferSchema } from "../Schema/TransferSchema";

export interface ITransferModel extends ITransferModelEntity { }
export const transferDB = mongoose.model("transfer",TransferSchema)