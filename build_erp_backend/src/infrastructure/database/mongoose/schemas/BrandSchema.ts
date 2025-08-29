import mongoose from 'mongoose';
import { IBrandModelEntity } from '../../../../domain/Entities/modelEntities/brand.entity';


export const BrandSchema = new mongoose.Schema<IBrandModelEntity>({
    brand_name: {
        type: String,
        required: true,
    },
},{ timestamps:true });
