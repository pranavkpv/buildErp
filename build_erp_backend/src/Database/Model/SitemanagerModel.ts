import mongoose from "mongoose";
import { ISitemanagerModelEntity } from "../../Entities/ModelEntities/Sitemanager.Entity";
import { SitemanagerSchema } from "../Schema/SitemanagerSchema";

export interface ISitemanagerModel extends ISitemanagerModelEntity { }
export const sitemanagerDB = mongoose.model('Sitemanager', SitemanagerSchema)