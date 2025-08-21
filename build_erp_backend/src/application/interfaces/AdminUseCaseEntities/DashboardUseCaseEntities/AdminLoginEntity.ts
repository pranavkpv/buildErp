import { IAdminModelEntity } from "../../../../domain/Entities/modelEntities/admin.entity";
import { commonOutput } from "../../../dto/common";
import { inputAdmin } from "../../../entities/admin.entity";
import { Tokens } from "../../../entities/token.entity";


export interface IAdminLoginUseCaseEntity {
   execute(input: inputAdmin): Promise<commonOutput<{ data: IAdminModelEntity, token: Tokens }> | commonOutput>
}