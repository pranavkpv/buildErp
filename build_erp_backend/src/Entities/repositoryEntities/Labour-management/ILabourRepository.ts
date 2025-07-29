import { labourOutput } from "../../Input-OutputEntities/LabourEntities/labour";
import { ILabourModelEntity } from "../../ModelEntities/Labour.Entity";

export interface ILabourRepository{
   findAllLabour(page:number,search:string):Promise<labourOutput>;
   findLabourByType(labour_type:string):Promise<ILabourModelEntity | null>
   saveLabour(labour_type:string,daily_wage:number):Promise<void>
   deleteLabourById(_id:string):Promise<void>
   findLabourInEdit(_id:string,labour_type:string):Promise<ILabourModelEntity | null>
   updateLabourById(_id:string,labour_type:string,daily_wage:number):Promise<void>
   fetchLabourData():Promise<ILabourModelEntity[] | []>
   findLabourById(_id:string) : Promise<ILabourModelEntity | null>
   findSumofLabouor(labours:{ labour_id: string, numberoflabour: number }[]):Promise<number>
}