import { commonOutput } from "../../../Input-OutputEntities/CommonEntities/common";
import { editUnitInput } from "../../../Input-OutputEntities/MaterialEntities/unit";

export interface IupdateUnitUseCase {
   execute(input: editUnitInput): Promise<commonOutput>
}