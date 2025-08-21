import { FetchsitemanagerInListDTO } from "../../application/dto/addsitemanagerToproject";
import { listSitemanagerDTO } from "../../application/dto/sitemanager.dto";
import { ISitemanagerModelEntity } from "../Entities/modelEntities/sitemanager.entity";

export interface ISitemanagerMapper {
   toFetchSitemanagerNameandId(sitemanager:ISitemanagerModelEntity[]):FetchsitemanagerInListDTO[]
   toListingSitemanagerDTO(sitemanager:ISitemanagerModelEntity[]):listSitemanagerDTO[]
}