export interface IDisplayAllCategoryUseCase{
   execute(page:number,search:string): Promise<{getCategoryData:any[];totalPage:number }>
}