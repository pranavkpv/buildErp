import mongoose from "mongoose";
import { ITransferModelEntity } from "../../domain/Entities/modelEntities/transfer.entity";
import { TransferSchema } from "../../infrastructure/database/mongoose/schemas/TransferSchema";

export interface ITransferModel extends ITransferModelEntity { }
export const transferDB = mongoose.model("transfer",TransferSchema)