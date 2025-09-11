import { IProjectModelEntity } from "../../domain/Entities/modelEntities/project.entity"
import { IStageModelEntity } from "../../domain/Entities/modelEntities/stage.entity"


export interface stageInputData {
   _id?: string
   stages: stage[],
   projectId: string,
   startDate: string,
   endDate: string,
   cost: number
}

export interface costInput {
   projectId: string,
   startDate: string,
   endDate: string,
   cost: number
}


export interface uploadImageInput {
   _id: string
   url: string | string[]
   date: string
}

export interface stage {
   stage_name: string;
   start_date: string;
   end_date: string;
   stage_percentage: number;
   stage_amount: number;
   status_date: string
}

export interface stageWithAggregateProject {
   _id: string,
   count: number,
   completion_per: number,
   project_name: string,
   start_date: Date,
   end_date: Date
}