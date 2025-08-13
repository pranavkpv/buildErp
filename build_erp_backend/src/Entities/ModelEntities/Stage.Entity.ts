export interface IStageImageEntry {
  date: string;
  image: string[];
} 

export interface IStageModelEntity {
  _id:string
   project_id: string;
   stage_name: string;
   start_date: Date;
   end_date: Date;
   stage_per: number;
   stage_amount: number;
   stage_image?: IStageImageEntry[];
   progress: number,
   status_date?: string
   createdAt: Date
   updatedAt: Date
}