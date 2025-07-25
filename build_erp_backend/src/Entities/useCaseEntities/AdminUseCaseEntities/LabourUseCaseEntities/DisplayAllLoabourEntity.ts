export interface IDisplayAllLabourUsecase{
   execute(page:number,search:string): Promise<{getLabourData:any[];totalPage:number }>
}