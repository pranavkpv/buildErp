import { labourAddInput, labourSumInput } from "../../../application/entities/labour.entity";
import { ILabourModelEntity } from "../../Entities/modelEntities/labour.entity";

export interface ILabourRepository {
   findAllLabour(input: listingInput): Promise<labourOutput>;
   findLabourByType(labour_type: string): Promise<ILabourModelEntity | null>
   saveLabour(input: labourAddInput): Promise<void>
   deleteLabourById(_id: string): Promise<void>
   findLabourInEdit(_input: inputLabour): Promise<ILabourModelEntity | null>
   updateLabourById(input: inputLabour): Promise<void>
   fetchLabourData(): Promise<ILabourModelEntity[] | []>
   findLabourById(_id: string): Promise<ILabourModelEntity | null>
   findSumofLabouor(input:labourSumInput[]): Promise<number>
}