import mongoose, { Schema, Document } from "mongoose";

export interface IEstimationLabour extends Document {
  _id: string;
  labour_id: string;
  numberoflabour: number;
  daily_wage: number;
  project_id: string;
}

const EstimationLabourSchema: Schema = new Schema({
  labour_id: {
    type: String,
    required: true,
  },
  numberoflabour: {
    type: Number,
    required: true,
  },
  daily_wage: {
    type: Number,
    required: true,
  },
  project_id: {
    type: String,
    required: true,
  },
}, { timestamps: true });


const EstimationLabourModel = mongoose.models.Estimation_Labour || mongoose.model<IEstimationLabour>('Estimation_Labour', EstimationLabourSchema);

export default EstimationLabourModel;
