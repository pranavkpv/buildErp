export interface IDisplayAllBrandUseCase{
   execute(page:number,search:string): Promise<{getBrandData:any[];totalPage:number }>
}