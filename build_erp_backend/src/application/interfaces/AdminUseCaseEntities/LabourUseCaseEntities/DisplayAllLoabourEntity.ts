

export interface IDisplayAllLabourUsecase{
   execute(page:number,search:string): Promise<labourOutput | commonOutput>
}