import mongoose from "mongoose";
import { IUnitModel } from "../Model/UnitModel";


export const UnitSchema = new mongoose.Schema<IUnitModel>({
   unit_name: {
      type: String,
      required: true
   },
   short_name: {
      type: String
   }
},{timestamps:true})

