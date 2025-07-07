import { aggregateSpec, outputSpec, Specification } from "../types/specification";

type materialData = {
   material_id: string
   quantity: number
}
type labourData = {
   labour_id: string,
   numberoflabour: number
}
export interface ISpecRepository{
   fetchSpecList(page:number,search:string) : Promise<{result:Specification[],totalPage:number}>;
   saveSpecData(specId: String, specname: String, specUnit: String, specDescription: String, materialDetails: materialData[],
   labourDetails: labourData[], additionalExpensePer: number, profitPer: number):Promise<void>;
   existSpecname(specname:string) : Promise<Specification | null>
   existSpecId(specId:string):Promise<Specification | null>
   //deleteSpec
   DeleteSpec(_id:string):Promise<void>
   fetchSpec():Promise<Specification[]>

}
