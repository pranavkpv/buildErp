import mongoose from "mongoose";
import { ISitemanagerModelEntity } from "../../domain/Entities/modelEntities/sitemanager.entity";
import { SitemanagerSchema } from "../../infrastructure/database/mongoose/schemas/SitemanagerSchema";

export interface ISitemanagerModel extends ISitemanagerModelEntity { }
export const sitemanagerDB = mongoose.model('Sitemanager', SitemanagerSchema)