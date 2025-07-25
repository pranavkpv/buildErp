import { commonOutput } from "../../../Input-OutputEntities/CommonEntities/common";
import { addBrandInput } from "../../../Input-OutputEntities/MaterialEntities/brand";

export interface ISaveBrandUseCase{
   execute(input: addBrandInput): Promise<commonOutput>
}