import mongoose from 'mongoose';
import { IAdminModelEntity } from '../../../domain/Entities/modelEntities/admin.entity';



export const AdminSchema = new mongoose.Schema<IAdminModelEntity>({
    username: {
        type: String,
    },
    password: {
        type: String,
    },
});


