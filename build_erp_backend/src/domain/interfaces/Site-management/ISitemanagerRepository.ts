import { listingInput } from "../../../application/entities/common.entity";
import { addsitemanagerInput, editSitemanagerInput } from "../../../application/entities/sitemanager.entity";
import { ISitemanagerModelEntity } from "../../Entities/modelEntities/sitemanager.entity";

export interface ISitemanagerRepository {
   findAllSitemanager(input:listingInput): Promise<{ getSiteData: ISitemanagerModelEntity[]; totalPage: number }>;
   findSitemanagerByEmail(email:string):Promise<ISitemanagerModelEntity | null >
   saveSitemanager(input:addsitemanagerInput):Promise<void>
   findSitemanagerInEdit(_id:string,email:string):Promise<ISitemanagerModelEntity | null>
   updateSitemanager(input:editSitemanagerInput):Promise<void>
   deleteSitemanager(_id:string):Promise<void>
   generatePassword():Promise<string>
   findSitemanagerById(_id:string):Promise<ISitemanagerModelEntity | null>
   updatePassword(input:updatePasswordInput):Promise<void>
}