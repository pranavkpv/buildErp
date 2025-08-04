import mongoose from "mongoose";
import { IReceiveModelEntity } from "../../Entities/ModelEntities/Recieve.Entity";


export const ReceiveSchema = new mongoose.Schema<IReceiveModelEntity>({
   project_id: {
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
   ],
   transfer_id: {
      type: [String]
   }
}, { timestamps: true })

