import mongoose, { Schema, Document } from "mongoose";
import { Specification } from "../domain/types/specification";

export interface ISpec extends Specification, Document {
   _id: string
}

const SpecSchema: Schema = new Schema({
   spec_id: {
      type: String,
      required: true
   },
   spec_name: {
      type: String,
      required: true
   },
   spec_unit: {
      type: String,
      required: true
   }, description: {
      type: String
   },
   materialDetails: [{
      material_id: {
         type: String
      },
      quantity: {
         type: Number
      }
   }], labourDetails: [{
      labour_id: {
         type: String
      },
      numberoflabour: {
         type: Number
      }
   }], additionalExpense_per: {
      type: Number
   },
   profit_per: {
      type: Number
   }
}, { timestamps: true })

const SpecModel = mongoose.model<ISpec>('Spec', SpecSchema)
export default SpecModel













