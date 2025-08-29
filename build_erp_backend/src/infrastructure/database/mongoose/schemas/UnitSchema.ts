import mongoose from 'mongoose';
import { IUnitModelEntity } from '../../../../domain/Entities/modelEntities/unit.entity';


export const UnitSchema = new mongoose.Schema<IUnitModelEntity>({
    unit_name: {
        type: String,
        required: true,
    },
    short_name: {
        type: String,
    },
},{ timestamps:true });

