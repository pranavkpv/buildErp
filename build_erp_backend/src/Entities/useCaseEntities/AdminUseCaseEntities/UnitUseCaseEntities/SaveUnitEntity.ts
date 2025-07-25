import { commonOutput } from "../../../Input-OutputEntities/CommonEntities/common";
import { addUnitInput } from "../../../Input-OutputEntities/MaterialEntities/unit";

export interface ISaveUnitUseCase {
   execute(input: addUnitInput): Promise<commonOutput>
}