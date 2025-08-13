import { commonOutput } from "../../../../DTO/CommonEntities/common";
import { sitemanagerOutput } from "../../../../DTO/SitemanagerEntities/sitemanager";

export interface IListSiteToProjectUseCaseEntity {
   execute(page: number, search: string): Promise<sitemanagerOutput | commonOutput>
}