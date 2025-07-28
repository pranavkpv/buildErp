import { commonOutput } from "../../../Input-OutputEntities/CommonEntities/common";

export interface IDisplayAllSitemanagerUseCase {
   execute(page:number,search:string): Promise<{getSiteData:any[];totalPage:number } | commonOutput>
}