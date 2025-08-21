import { materialData } from "../../../../domain/Entities/modelEntities/transfer.entity";
import { commonOutput } from "../../../dto/common";



export interface IApproveReceiveUseCaseEntity {
   execute(_id:string,project_id:string,materialDetails:materialData[]):Promise<commonOutput>
}