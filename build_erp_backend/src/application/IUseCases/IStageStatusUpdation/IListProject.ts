import { IProjectModelEntity } from "../../../domain/Entities/modelEntities/project.entity";
import { commonOutput } from "../../dto/common";



export interface IListProjectUseCase {
   execute(user:string):Promise<commonOutput<IProjectModelEntity[]> | commonOutput>
}