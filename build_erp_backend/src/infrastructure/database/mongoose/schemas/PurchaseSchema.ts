import mongoose from "mongoose";
import { IPurchaseModel } from "../../../../api/models/PurchaseModel";


export const PurchaseSchema = new mongoose.Schema<IPurchaseModel>({
   project_id: {
      type: String
   },
   approval_status:{
      type:Boolean
   },
   date:{
      type:Date
   },
   description:{
      type:String
   },
   invoice_number:{
      type:String
   },
   materialDetails:[
      {
         material_id:{
            type:String
         },
         quantity:{
            type:Number
         },
         unit_rate:{
            type:Number
         }
      }
   ]
}, { timestamps: true })

