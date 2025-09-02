import mongoose from 'mongoose';
import { StockSchema } from '../../infrastructure/database/schemas/ProjectStockSchema';


export const projectStockDB = mongoose.model('Stock', StockSchema);