import { IStageImageEntry } from '../../domain/Entities/modelEntities/stage.entity';

export interface publicstageDTO {
   _id: string;
   stage_name: string;
   start_date: Date;
   end_date: Date;
   stage_amount: number;
   stage_per:number;
   progress: number;
   status_date: Date;
   paymentStatus:string;
   stage_image:IStageImageEntry[]
}

export interface stageListDTO {
   _id: string
   project_name: string;
   start_date: Date;
   end_date: Date;
   budgeted_cost:number
}

