import { ILabourModelEntity } from "../../../ModelEntities/Labour.Entity";

export interface IFetchAllLabourUseCase{
   execute():Promise<ILabourModelEntity[] | []>
}