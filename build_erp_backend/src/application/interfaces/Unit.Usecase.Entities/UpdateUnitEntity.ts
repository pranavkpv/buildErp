import { commonOutput } from "../../dto/common";
import { saveUnitInput } from "../../entities/unit.entity";

export interface IupdateUnitUseCase {
   execute(input: saveUnitInput): Promise<commonOutput>
}