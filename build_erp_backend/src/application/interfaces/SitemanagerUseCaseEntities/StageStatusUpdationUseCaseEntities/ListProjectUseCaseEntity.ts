import { IProjectModelEntity } from "../../../../domain/Entities/modelEntities/project.entity";
import { commonOutput } from "../../../dto/common";



export interface IListProjectUseCaseEntity {
   execute(user:string):Promise<commonOutput<IProjectModelEntity[]> | commonOutput>
}