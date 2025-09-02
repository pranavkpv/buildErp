import mongoose from 'mongoose';
import { IBannerModelEntity } from '../../../domain/Entities/modelEntities/banner.entity';



export const BannerSchema = new mongoose.Schema<IBannerModelEntity>({
   title: {
      type: String,
      required: true,
   },
   subtitle: {
      type: String,
      required: true
   },
   image: {
      type: String,
      required: true
   },
   blockStatus: {
      type: Boolean,
      required: true,
      default: false
   }
}, { timestamps: true });
