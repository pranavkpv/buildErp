export interface IDisplayAllMaterialUsecase{
   execute(page:number,search:string): Promise<{getMaterialData:any[];totalPage:number }>
}