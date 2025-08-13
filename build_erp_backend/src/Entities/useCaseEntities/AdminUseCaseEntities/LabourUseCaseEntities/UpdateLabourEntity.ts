import { commonOutput } from "../../../../DTO/CommonEntities/common";
import { inputLabour } from "../../../../DTO/LabourEntities/labour";

export interface IUpdateLabourUseCaseEntity{
   execute(input:inputLabour):Promise<commonOutput>
}