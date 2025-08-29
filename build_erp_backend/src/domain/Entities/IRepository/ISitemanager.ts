import { listingInput } from '../../../application/Entities/common.entity';
import { addsitemanagerInput, changePasswordInput, editSitemanagerInput } from '../../../application/Entities/sitemanager.entity';

import { ISitemanagerModelEntity } from '../modelEntities/sitemanager.entity';

export interface ISitemanagerRepository {

   getAllSitemanagers(input: listingInput):
      Promise<{ getSiteData: ISitemanagerModelEntity[]; totalPage: number }>;

   getSitemanagerByEmail(email: string):
      Promise<ISitemanagerModelEntity | null>

   createSitemanager(input: addsitemanagerInput):
      Promise<void>

   getSitemanagerForEdit(id: string, email: string):
      Promise<ISitemanagerModelEntity | null>

   updateSitemanagerDetails(input: editSitemanagerInput):
      Promise<void>

   removeSitemanagerById(id: string):
      Promise<void>

   generateRandomPassword():
      Promise<string>

   getSitemanagerById(id: string):
      Promise<ISitemanagerModelEntity | null>

   updateSitemanagerPassword(input: Omit<changePasswordInput, 'changedpassword'>):
      Promise<void>

}