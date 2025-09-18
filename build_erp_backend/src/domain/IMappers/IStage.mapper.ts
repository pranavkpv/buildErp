import { walletDTO } from '../../application/dto/payment.dto';
import { displayProjectWithCompletionDTO } from '../../application/dto/project.dto';
import { publicstageDTO, verifyStageDTO } from '../../application/dto/stage.dto';
import { paymentAggregateByStage, stageWithAggregateProject } from '../../application/Entities/stage.entity';
import { IStageModelEntity } from '../Entities/modelEntities/stage.entity';

export interface IStagemapper {
   topublicStageDto(stage:IStageModelEntity[]):publicstageDTO[]
   toProjectWithCompletionDTO(input:stageWithAggregateProject[]):displayProjectWithCompletionDTO[]
   toVerifypaymentDTO(input:paymentAggregateByStage[]):verifyStageDTO[]
   toWalletDTO(input:paymentAggregateByStage[]):walletDTO[]
}