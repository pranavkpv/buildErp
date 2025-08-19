import { commonOutput } from "../../../dto/CommonEntities/common";
import { inputLabour } from "../../../dto/LabourEntities/labour";

export interface IUpdateLabourUseCaseEntity{
   execute(input:inputLabour):Promise<commonOutput>
}