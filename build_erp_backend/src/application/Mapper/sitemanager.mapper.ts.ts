import { ISitemanagerModelEntity } from "../../domain/Entities/modelEntities/sitemanager.entity";
import { ISitemanagerMapper } from "../../domain/mappers/ISitemanager.mapper";
import { FetchsitemanagerInListDTO } from "../dto/addsitemanagerToproject";
import { listSitemanagerDTO } from "../dto/sitemanager.dto";

export class sitemanagerMapper implements ISitemanagerMapper {
   toFetchSitemanagerNameandId(sitemanager: ISitemanagerModelEntity[]): FetchsitemanagerInListDTO[] {
      return sitemanager.map((item) => (
         {
            _id: item._id,
            username: item.username
         }
      ))
   }
   toListingSitemanagerDTO(sitemanager: ISitemanagerModelEntity[]): listSitemanagerDTO[] {
      return sitemanager.map((element) => ({
         _id: element._id,
         email: element.email,
         password: element.password,
         username: element.username
      }))
   }
}