import { materialData } from '../../../domain/Entities/modelEntities/transfer.entity';
import { commonOutput } from '../../dto/common';

export interface IApproveReceiveUseCase {
   execute(id:string,projectId:string,materialDetails:materialData[]):Promise<commonOutput>
}