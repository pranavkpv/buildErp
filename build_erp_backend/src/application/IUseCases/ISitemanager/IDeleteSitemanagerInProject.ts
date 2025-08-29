import { commonOutput } from '../../dto/common';


export interface IDeleteSiteToProjectUseCase {
   execute(id:string,sitemanagerId:string): Promise<commonOutput>
}