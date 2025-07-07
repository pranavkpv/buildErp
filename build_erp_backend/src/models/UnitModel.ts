import mongoose, { Schema, Document } from "mongoose";
import { Unit } from "../domain/types/unit";

export interface IUnit extends Unit, Document {
  _id:string
}

const UnitSchema: Schema = new Schema({
   unit_name: {
      type: String,
      required: true
   },
   short_name: {
      type: String
   }
},{timestamps:true})

const UnitModel= mongoose.model<IUnit>('Unit', UnitSchema)
export default UnitModel