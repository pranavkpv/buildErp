export interface IStageImageEntry {
  date: string;
  image: string[];
} 

export interface IStageModelEntity {
   project_id: string;
   stage_name: string;
   start_date: string;
   end_date: string;
   stage_per: number;
   stage_amount: number;
   stage_image?: IStageImageEntry[];
   progress: number,
   status_date?: string
}