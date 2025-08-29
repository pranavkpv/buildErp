import mongoose from 'mongoose';
import { SitemanagerSchema } from '../../infrastructure/database/mongoose/schemas/SitemanagerSchema';

export const sitemanagerDB = mongoose.model('Sitemanager', SitemanagerSchema);