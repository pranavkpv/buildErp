import mongoose from 'mongoose';
import { IProjectModelEntity } from '../../../domain/Entities/modelEntities/project.entity';



export const ProjectSchema = new mongoose.Schema<IProjectModelEntity>(
    {
        project_name: {
            type: String,
            required: true,
        },
        user_id: {
            type: String,
            required: true,
        },
        address:{
            type:String,
        },
        latitude:{
            type:Number,
        },
        longitude:{
            type:Number,
        },
        mobile_number:{
            type:Number,
        },
        email:{
            type:String,
            required:true,
        },
        description: {
            type: String,
        },
        area:{
            type:Number,
        },
        status: {
            type: String,
            enum: ['pending', 'processing', 'completed'],
            required:true,
        },
        sitemanager_id: {
            type: String,
        },
        start_date: {
            type: Date,
        },
        end_date: {
            type: Date,
        },
        expected_image: {
            type: String,
        },
        finalImage: {
            type: String,
        },
        budgeted_cost:{
            type:Number,
        },
    },
    { timestamps: true },
);

