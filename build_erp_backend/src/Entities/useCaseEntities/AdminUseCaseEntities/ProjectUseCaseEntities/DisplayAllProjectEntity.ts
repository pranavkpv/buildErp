export interface IDisplayAllProjectUseCase {
   execute(page:number,search:string): Promise<{getProjectListData:any[];totalPage:number }>
}