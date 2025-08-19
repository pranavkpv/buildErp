import { ISitemanagerModelEntity } from "../../domain/Entities/modelEntities/sitemanager.entity";
import { ISitemanagerMapper } from "../../domain/mappers/ISitemanager.mapper";
import { FetchsitemanagerInListDTO } from "../dto/addsitemanagerToproject";

export class sitemanagerMapper implements ISitemanagerMapper {
   toFetchSitemanagerNameandId(sitemanager: ISitemanagerModelEntity[]): FetchsitemanagerInListDTO[] {
      return sitemanager.map((item) => (
         {
            _id: item._id,
            username: item.username
         }
      ))
   }
}