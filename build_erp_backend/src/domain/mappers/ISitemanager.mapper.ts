import { FetchsitemanagerInListDTO } from "../../application/dto/addsitemanagerToproject";
import { ISitemanagerModelEntity } from "../Entities/modelEntities/sitemanager.entity";

export interface ISitemanagerMapper {
   toFetchSitemanagerNameandId(sitemanager:ISitemanagerModelEntity[]):FetchsitemanagerInListDTO[]
}