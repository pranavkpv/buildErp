export interface IListSiteToProject {
   execute(page: number, search: string): Promise<{ getAddSiteData: any[]; totalPage: number }>
}