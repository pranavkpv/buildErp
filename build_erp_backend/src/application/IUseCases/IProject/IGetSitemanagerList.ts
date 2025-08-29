import { commonOutput } from '../../dto/common';
import { userBasechatListDTO } from '../../dto/project.dto';


export interface IGetSitemanagerListDataUseCase {
   execute(id:string):Promise<commonOutput<userBasechatListDTO[]> | commonOutput>
}