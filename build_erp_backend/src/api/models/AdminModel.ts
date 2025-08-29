import mongoose from 'mongoose';
import { IAdminModelEntity } from '../../domain/Entities/modelEntities/admin.entity';
import { AdminSchema } from '../../infrastructure/database/mongoose/schemas/AdminSchema';

export const adminDB = mongoose.model<IAdminModelEntity>('Admin', AdminSchema);
