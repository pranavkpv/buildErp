import mongoose from 'mongoose';
import { SitemanagerSchema } from '../../infrastructure/database/schemas/SitemanagerSchema';

export const sitemanagerDB = mongoose.model('Sitemanager', SitemanagerSchema);