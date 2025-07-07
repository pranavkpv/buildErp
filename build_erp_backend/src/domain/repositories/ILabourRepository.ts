import { Labour } from "../types/labour";

export interface ILabourRepository{
   findAllLabour(page:number,search:string):Promise<{getLabourData:any[];totalPage:number }>;
   findLabourByType(labour_type:string):Promise<Labour | null>
   saveLabour(labour_type:string,daily_wage:number):Promise<void>
   deleteLabourById(_id:string):Promise<void>
   findLabourInEdit(_id:string,labour_type:string):Promise<Labour | null>
   updateLabourById(_id:string,labour_type:string,daily_wage:number):Promise<void>
   fetchLabourData():Promise<Labour[] | []>
   findLabourById(_id:string) : Promise<Labour | null>
   findSumofLabouor(labours:{ labour_id: string, numberoflabour: number }[]):Promise<number>
}