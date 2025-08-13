import { listingInput } from "../../../DTO/CommonEntities/common";
import { inputLabour, labourOutput } from "../../../DTO/LabourEntities/labour";
import { ILabourModelEntity } from "../../ModelEntities/Labour.Entity";

export interface ILabourRepositoryEntity {
   findAllLabour(input: listingInput): Promise<labourOutput>;
   findLabourByType(labour_type: string): Promise<ILabourModelEntity | null>
   saveLabour(input: inputLabour): Promise<void>
   deleteLabourById(_id: string): Promise<void>
   findLabourInEdit(_input: inputLabour): Promise<ILabourModelEntity | null>
   updateLabourById(input: inputLabour): Promise<void>
   fetchLabourData(): Promise<ILabourModelEntity[] | []>
   findLabourById(_id: string): Promise<ILabourModelEntity | null>
   findSumofLabouor(labours: { labour_id: string, numberoflabour: number }[]): Promise<number>
}