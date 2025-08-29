import mongoose from 'mongoose';
import { ProjectSchema } from '../../infrastructure/database/mongoose/schemas/ProjectSchema';

export const projectDB = mongoose.model('Project', ProjectSchema);