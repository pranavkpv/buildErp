import { commonOutput } from "../../dto/common";


export interface IDeleteSitemanagerUseCase {
   execute(_id:string):Promise<commonOutput>
}