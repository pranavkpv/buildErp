import { IUnitModelEntity } from "../../../ModelEntities/Unit.Entity";

export interface IFetchUnitUseCase {
   execute():Promise<IUnitModelEntity[] | []>
}