import { commonOutput } from "../../../Input-OutputEntities/CommonEntities/common";
import { editBrandInput } from "../../../Input-OutputEntities/MaterialEntities/brand";

export interface IUpdateBrandUseCase{
   execute(input: editBrandInput): Promise<commonOutput> 
}