export interface IDisplayAllUnitUseCase {
   execute(page:number,search:string): Promise<{getUnitData:any[];totalPage:number }>
}