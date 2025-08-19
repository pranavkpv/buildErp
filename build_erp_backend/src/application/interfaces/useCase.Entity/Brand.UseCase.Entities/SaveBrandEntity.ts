import { commonOutput } from "../../dto/CommonEntities/common";

export interface ISaveBrandUseCaseEntity{
   execute(input: addBrandInput): Promise<commonOutput>
}