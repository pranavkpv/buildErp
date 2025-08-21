export interface publicstageDTO {
   _id: string;
   stage_name: string;
   start_date: Date;
   end_date: Date;
   stage_amount: number;
   progress: number;
   status_date: Date;
}

export interface stageListDTO {
   _id: string
   project_name: string;
   start_date: Date;
   end_date: Date;
}

