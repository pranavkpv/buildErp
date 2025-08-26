import { FetchsitemanagerInListDTO } from "../../dto/addsitemanagerToproject";
import { commonOutput } from "../../dto/common";

export interface IAddSiteToprojectFetchSitemanagerUseCase {
   execute():Promise<commonOutput<FetchsitemanagerInListDTO[]> | commonOutput>
}