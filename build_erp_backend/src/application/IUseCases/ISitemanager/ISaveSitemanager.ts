import { commonOutput } from "../../dto/common";
import { addsitemanagerInput } from "../../Entities/sitemanager.entity";



export interface ISaveSitemanagerUseCase {
   execute(input:addsitemanagerInput): Promise<commonOutput>
}