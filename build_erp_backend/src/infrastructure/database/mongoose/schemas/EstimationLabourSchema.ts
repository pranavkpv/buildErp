import mongoose from "mongoose";
import { IEstimationLabourModel } from "../../../../api/models/EstimationLabourModel";

export const EstimationLabourSchema = new mongoose.Schema<IEstimationLabourModel>({
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


