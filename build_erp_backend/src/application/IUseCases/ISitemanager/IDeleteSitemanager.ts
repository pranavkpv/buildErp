import { commonOutput } from '../../dto/common';


export interface IDeleteSitemanagerUseCase {
   execute(id:string):Promise<commonOutput>
}