import { commonOutput } from "../../../Input-OutputEntities/CommonEntities/common";
import { editLabourInput } from "../../../Input-OutputEntities/LabourEntities/labour";

export interface IUpdateLabourUseCase{
   execute(input:editLabourInput):Promise<commonOutput>
}