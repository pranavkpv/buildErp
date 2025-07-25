import { commonOutput } from "../../../Input-OutputEntities/CommonEntities/common";

export interface IDeleteSitemanagerUseCase {
   execute(_id:string):Promise<commonOutput>
}