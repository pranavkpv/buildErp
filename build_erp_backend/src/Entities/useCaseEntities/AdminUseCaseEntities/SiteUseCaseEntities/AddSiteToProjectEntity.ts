import { commonOutput } from "../../../../DTO/CommonEntities/common";
import { addSite } from "../../../../DTO/SitemanagerEntities/addSite";

export interface IAddSiteToProjectUseCaseEntity {
   execute(input: addSite): Promise<commonOutput>
}