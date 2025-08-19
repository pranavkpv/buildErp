import { inputUnit } from "../../dto/UnitEntities/Unit.Entity";
import { commonOutput } from "../../dto/CommonEntities/common";

export interface ISaveUnitUseCaseEntity {
   execute(input: inputUnit): Promise<commonOutput>
}