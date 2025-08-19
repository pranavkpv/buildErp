import mongoose from "mongoose";
import { IPurchaseModelEntity } from "../../domain/Entities/modelEntities/purchase.entity";
import { PurchaseSchema } from "../../infrastructure/database/mongoose/schemas/PurchaseSchema";

export interface IPurchaseModel extends IPurchaseModelEntity { }
export const purchaseDB = mongoose.model("purchase",PurchaseSchema)