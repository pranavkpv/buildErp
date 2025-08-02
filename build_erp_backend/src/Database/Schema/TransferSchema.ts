import mongoose from "mongoose";
import { ITransferModel } from "../Model/TransferModel";



export const TransferSchema = new mongoose.Schema<ITransferModel>({
   from_project_id: {
      type: String
   },
   to_project_id: {
      type: String
   },
   approval_status: {
      type: Boolean
   },
   date: {
      type: Date
   },
   description: {
      type: String
   },
   transfer_id: {
      type: String
   },
   materialDetails: [
      {
         material_id: {
            type: String
         },
         quantity: {
            type: Number
         },
         unit_rate: {
            type: Number
         }
      }
   ]
}, { timestamps: true })

