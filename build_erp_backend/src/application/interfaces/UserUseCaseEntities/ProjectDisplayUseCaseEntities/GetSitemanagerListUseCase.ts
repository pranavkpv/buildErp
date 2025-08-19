import { commonOutput } from "../../../dto/common";
import { userBasechatListDTO } from "../../../dto/project.dto";


export interface IGetSitemanagerListDataUseCase {
   execute(_id:string):Promise<commonOutput<userBasechatListDTO[]> | commonOutput>
}