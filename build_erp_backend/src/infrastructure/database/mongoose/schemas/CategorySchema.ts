import mongoose from 'mongoose';
import { ICategoryModelEntity } from '../../../../domain/Entities/modelEntities/category.entity';

export const CategorySchema = new mongoose.Schema<ICategoryModelEntity>({
    category_name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
},{ timestamps:true });
