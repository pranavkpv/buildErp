import { listingInput } from "../../../application/entities/common.entity";
import { labourAddInput, labourEditInput, labourSumInput } from "../../../application/entities/labour.entity";
import { ILabourModelEntity } from "../../Entities/modelEntities/labour.entity";

export interface ILabourRepository {
   findAllLabour(input: listingInput): Promise<{data:ILabourModelEntity[],totalPage:number}> ;
   findLabourByType(labour_type: string): Promise<ILabourModelEntity | null>
   saveLabour(input: labourAddInput): Promise<void>
   deleteLabourById(_id: string): Promise<void>
   findLabourInEdit(_id:string,labour_type:string): Promise<ILabourModelEntity | null>
   updateLabourById(input: labourEditInput): Promise<void>
   fetchLabourData(): Promise<ILabourModelEntity[] | []>
   findLabourById(_id: string): Promise<ILabourModelEntity | null>
   findSumofLabouor(input:labourSumInput[]): Promise<number>
}