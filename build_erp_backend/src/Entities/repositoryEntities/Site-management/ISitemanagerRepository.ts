import { Sitemanager } from "../../Input-OutputEntities/SitemanagerEntities/sitemanager";
import { ISitemanagerModelEntity } from "../../ModelEntities/Sitemanager.Entity";

export interface ISitemanagerRepository{
   findAllSitemanager(page:number,search:string):Promise<{getSiteData:any[];totalPage:number }>;
   findSitemanagerByEmail(email:string):Promise<ISitemanagerModelEntity | null >
   saveSitemanager(username:string,email:string,password:string):Promise<void>
   findSitemanagerInEdit(_id:string,email:string):Promise<ISitemanagerModelEntity | null>
   updateSitemanager(_id:string,username:string,email:string):Promise<void>
   deleteSitemanager(_id:string):Promise<void>
   generatePassword():Promise<string>
   findSitemanagerById(_id:string):Promise<ISitemanagerModelEntity | null>
   updatePassword(_id:string,password:string):Promise<void>
}