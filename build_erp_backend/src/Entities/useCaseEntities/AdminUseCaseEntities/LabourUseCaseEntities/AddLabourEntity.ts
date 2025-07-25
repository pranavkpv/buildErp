import { commonOutput } from "../../../Input-OutputEntities/CommonEntities/common";
import { addLabourInput } from "../../../Input-OutputEntities/LabourEntities/labour";

export interface IAddLabourUseCase{
   execute(input: addLabourInput): Promise<commonOutput>
}