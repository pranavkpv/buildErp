type stageData = {
   stage_name: string;
   start_date: string;
   end_date: string;
   stage_percentage: number;
   stage_amount: number;
};

export interface stageInputData {
   _id?:string
   stages: stageData[],
   projectId: string,
   startDate: string,
   endDate: string,
   cost: number
}

export interface costInput{
    projectId:string, 
    startDate:string, 
    endDate:string, 
    cost :number
   }


   export interface uploadImageInput {
       _id:string 
        url:string | string[]
        date :string
   }

   export interface stage {
      stage_name:string
      start_date:string
      end_date:string
      stage_percentage:number
      stage_amount:number
      status_date:string
   }