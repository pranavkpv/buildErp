type stageData = {
   stage_name: string;
   start_date: string;
   end_date: string;
   stage_percentage: number;
   stage_amount: number;
};

export interface stageSaveInterface {
   stages: stageData[],
   projectId: string,
   startDate: string,
   endDate: string,
   cost: number
}