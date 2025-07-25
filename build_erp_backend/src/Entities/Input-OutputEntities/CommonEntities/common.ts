import { IStageModelEntity } from "../../ModelEntities/Stage.Entity";
import { Tokens } from "../auth";

export interface commonOutput{
   success:boolean
   message:string | number | IStageModelEntity[]
   status_code:number
   token ?:Tokens
}