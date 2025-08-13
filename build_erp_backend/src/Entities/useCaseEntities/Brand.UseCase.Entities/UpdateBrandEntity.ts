import { commonOutput } from "../../../DTO/CommonEntities/common";
import { editBrandInput } from "../../../Input-OutputEntities/MaterialEntities/brand";

export interface IUpdateBrandUseCaseEntity{
   execute(input: editBrandInput): Promise<commonOutput> 
}