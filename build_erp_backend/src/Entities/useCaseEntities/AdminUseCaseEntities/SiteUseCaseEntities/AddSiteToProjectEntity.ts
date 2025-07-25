import { commonOutput } from "../../../Input-OutputEntities/CommonEntities/common";
import { addSite } from "../../../Input-OutputEntities/SitemanagerEntities/addSite";

export interface IAddSiteToProjectUseCase {
   execute(input: addSite): Promise<commonOutput>
}