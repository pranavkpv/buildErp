import mongoose from 'mongoose';
import { ISitemanagerModelEntity } from '../../../domain/Entities/modelEntities/sitemanager.entity';


export const SitemanagerSchema = new mongoose.Schema<ISitemanagerModelEntity>({
    username:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
},{ timestamps:true });

