import { inputUnit } from "../../../DTO/UnitEntities/Unit.Entity";
import { commonOutput } from "../../../DTO/CommonEntities/common";

export interface IupdateUnitUseCaseEntity {
   execute(input: inputUnit): Promise<commonOutput>
}