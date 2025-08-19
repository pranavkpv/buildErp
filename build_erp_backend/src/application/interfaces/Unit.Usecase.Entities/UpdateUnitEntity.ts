import { inputUnit } from "../../dto/UnitEntities/Unit.Entity";
import { commonOutput } from "../../dto/CommonEntities/common";

export interface IupdateUnitUseCaseEntity {
   execute(input: inputUnit): Promise<commonOutput>
}