import { commonOutput } from "../../../DTO/CommonEntities/common";

export interface ISaveBrandUseCaseEntity{
   execute(input: addBrandInput): Promise<commonOutput>
}