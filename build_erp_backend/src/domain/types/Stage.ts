export interface fetchcost{
   projectId:string
}

export interface Stage{
   stage_name:string,
   start_date:string,
   end_date:string,
   stage_percentage :number,
   stage_amount:number
   status : string,
   status_date?:string,
}

export interface fetchcostOutput{
   success:boolean
   message:string | number | stageData[]
}

export interface stageInputData{
   projectId:string,
   startDate:string,
   endDate:string,
   cost:number,
   stages:Stage[]
}

export interface stageImage {
  date: string;
  image: string[];
}

export interface stageData{
    project_id: string;
   stage_name: string;
   start_date: string;
   end_date: string;
   stage_per: number;
   stage_amount: number;
   stage_image?: stageImage[];
   status:string,
   status_date:string
}

export interface changeStatusInput{
   stageId:string,
   newProgress:number
   date:string
}