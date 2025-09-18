import { IStageModelEntity } from '../../domain/Entities/modelEntities/stage.entity';
import { IStagemapper } from '../../domain/IMappers/IStage.mapper';
import { walletDTO } from '../dto/payment.dto';
import { displayProjectWithCompletionDTO } from '../dto/project.dto';
import { publicstageDTO, verifyStageDTO } from '../dto/stage.dto';
import { paymentAggregateByStage, stageWithAggregateProject } from '../Entities/stage.entity';

export class Stagemapper implements IStagemapper {
    topublicStageDto(stage: IStageModelEntity[]): publicstageDTO[] {
        return stage.map((element) => ({
            _id: element._id,
            stage_name: element.stage_name,
            start_date: element.start_date,
            end_date: element.end_date,
            stage_amount: element.stage_amount,
            progress: element.progress,
            status_date: element.status_date,
            paymentStatus: element.payment_status,
            stage_image: element.stage_image,
            stage_per: element.stage_per
        }));
    }
    toProjectWithCompletionDTO(input: stageWithAggregateProject[]): displayProjectWithCompletionDTO[] {
        return input.map((element) => ({
            _id: element._id,
            completion_per: element.completion_per / element.count,
            project_name: element.project_name,
            start_date: element.start_date,
            end_date: element.end_date,
        }));
    }
    toVerifypaymentDTO(input: paymentAggregateByStage[]): verifyStageDTO[] {
        return input.map((element) => ({
            _id: element.stage_id,
            payment_date:element.date,
            payment_status:element.stageDetails.payment_status,
            project_name:element.projectDetails.project_name,
            stage_amount:element.stageDetails.stage_amount,
            stage_name:element.stageDetails.stage_name
        }))
    }
    toWalletDTO(input:paymentAggregateByStage[]):walletDTO[]{
        return input.map((element)=>({
            date:element.date,
            payment_amount:element.amount,
            paymentStatus:element.paymentStatus,
            project_name:element.projectDetails.project_name,
            purpose:element.purpose,
            stage_name:element.stageDetails.stage_name
        }))
    }
}