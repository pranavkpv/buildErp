import { inputUnit } from "../../../DTO/UnitEntities/Unit.Entity";
import { commonOutput } from "../../../DTO/CommonEntities/common";

export interface ISaveUnitUseCaseEntity {
   execute(input: inputUnit): Promise<commonOutput>
}