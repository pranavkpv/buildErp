import { Specification } from "../../Input-OutputEntities/EstimationEntities/specification"
import { ISpecModelEntity } from "../../ModelEntities/Spec.Entity"


type materialData = {
   material_id: string
   quantity: number
}
type labourData = {
   labour_id: string,
   numberoflabour: number
}
export interface ISpecRepository{
   fetchSpecList(page:number,search:string) : Promise<{result:any[],totalPage:number}>;
   saveSpecData(specId: String, specname: String, specUnit: String, specDescription: String, materialDetails: materialData[],
                labourDetails: labourData[], additionalExpensePer: number, profitPer: number):Promise<void>;
   existSpecname(specname:string) : Promise<ISpecModelEntity | null>
   existSpecId(specId:string):Promise<ISpecModelEntity | null>
   DeleteSpec(_id:string):Promise<void>
   fetchSpec():Promise<ISpecModelEntity[]>
   findSpecByMaterialId(_id:string):Promise<ISpecModelEntity | null>
   findSpecByLabourId(_id:string):Promise<ISpecModelEntity | null>
    UpdateSpec(_id:string,specId: String, specname: String, specUnit: String, specDescription: String, materialDetails: materialData[],
                labourDetails: labourData[], additionalExpensePer: number, profitPer: number):Promise<void>;
}
