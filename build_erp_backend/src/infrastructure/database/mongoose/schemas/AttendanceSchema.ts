import mongoose from 'mongoose';
import { IAttendanceModelEntity } from '../../../../domain/Entities/modelEntities/attendance.entity';



export const AttendanceSchema = new mongoose.Schema<IAttendanceModelEntity>({
    project_id: {
        type: String,
        required: true,
    },
    date:{
        type:Date,
        required:true,
    },
    approvalStatus:{
        type:Boolean,
        required:true,
    },
    labourDetails:[{
        labour_id:{
            type:String,
        },
        daily_wage:{
            type:Number,
        },
        numberOflabour:{
            type:Number,
        },
    }],
},{ timestamps:true });
