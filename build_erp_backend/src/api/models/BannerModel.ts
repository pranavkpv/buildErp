import mongoose from 'mongoose';
import { BannerSchema } from '../../infrastructure/database/schemas/BannerSchema';


export const  bannerDB = mongoose.model('Banner', BannerSchema);