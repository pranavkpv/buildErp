import mongoose from 'mongoose';
import { IProjectStockModelEntity } from '../../../../domain/Entities/modelEntities/projectStock.entity';

export const StockSchema = new mongoose.Schema<IProjectStockModelEntity>({
    project_id: {
        type: String,
    },
    material_id: {
        type: String,
    },
    stock: {
        type: Number,
    },
},{ timestamps:true });

