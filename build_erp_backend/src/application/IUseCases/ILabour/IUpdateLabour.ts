import { commonOutput } from "../../dto/common";
import { labourEditInput } from "../../Entities/labour.entity";


export interface IUpdateLabourUseCase {
   execute(input:labourEditInput):Promise<commonOutput>
}