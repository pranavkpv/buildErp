import { listingInput } from "../../../application/dto/CommonEntities/common";
import { editSitemanagerInput, saveSitemanagerInput, updatePasswordInput } from "../../../application/dto/SitemanagerEntities/sitemanager";
import { ISitemanagerModelEntity } from "../../Entities/modelEntities/sitemanager.entity";

export interface ISitemanagerRepositoryEntity {
   findAllSitemanager(input:listingInput):Promise<{getSiteData:any[];totalPage:number }>;
   findSitemanagerByEmail(email:string):Promise<ISitemanagerModelEntity | null >
   saveSitemanager(input:saveSitemanagerInput):Promise<void>
   findSitemanagerInEdit(_id:string,email:string):Promise<ISitemanagerModelEntity | null>
   updateSitemanager(input:editSitemanagerInput):Promise<void>
   deleteSitemanager(_id:string):Promise<void>
   generatePassword():Promise<string>
   findSitemanagerById(_id:string):Promise<ISitemanagerModelEntity | null>
   updatePassword(input:updatePasswordInput):Promise<void>
}