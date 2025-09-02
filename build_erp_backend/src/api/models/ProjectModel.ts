import mongoose from 'mongoose';
import { ProjectSchema } from '../../infrastructure/database/schemas/ProjectSchema';

export const projectDB = mongoose.model('Project', ProjectSchema);