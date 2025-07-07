import { Project } from "../types/project";
import { Sitemanager } from "../types/sitemanager";

export interface IAddSiteToProjectRepository {
   findProjectwithSitemanager(page: number, search: string): Promise<{ getAddSiteData: any[]; totalPage: number }>;
   findProjectWithoutSitemanager(): Promise<Project[] | null >;
   findSitemanagerExcludeproject():Promise<Sitemanager[] | null>
}