import mongoose from "mongoose";
import { IPurchaseModelEntity } from "../../Entities/ModelEntities/Purchase.Entity";
import { PurchaseSchema } from "../Schema/PurchaseSchema";

export interface IPurchaseModel extends IPurchaseModelEntity { }
export const purchaseDB = mongoose.model("purchase",PurchaseSchema)