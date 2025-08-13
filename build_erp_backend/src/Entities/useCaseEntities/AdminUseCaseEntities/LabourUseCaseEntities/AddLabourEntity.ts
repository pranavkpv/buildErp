import { commonOutput } from "../../../../DTO/CommonEntities/common";
import { inputLabour } from "../../../../DTO/LabourEntities/labour";

export interface IAddLabourUseCaseEntity{
   execute(input: inputLabour): Promise<commonOutput>
}