import { Profile } from "passport";
import { commonOutput } from "../../../Input-OutputEntities/CommonEntities/common";

export interface IgooglAuthUseCase {
    execute(profile: Profile): Promise<commonOutput> 
}