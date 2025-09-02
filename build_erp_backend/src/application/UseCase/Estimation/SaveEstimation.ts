import { ISaveEstimationUseCase } from '../../IUseCases/IEstimation/ISaveEstimation';
import { ResponseHelper } from '../../../Shared/responseHelpers/response';
import { IEstimationRepository } from '../../../domain/Entities/IRepository/IEstimation';
import { EstimationFailedMessage, EstimationSuccessMessage } from '../../../Shared/Messages/Estimation.Message';
import { saveEstimationInput } from '../../Entities/estimation.entity';
import { commonOutput } from '../../dto/common';


export class SaveEstimationUseCase implements ISaveEstimationUseCase {
  constructor(
    private _estimationRepository: IEstimationRepository,
  ) { }
  async execute(input: { projectId: string, row: saveEstimationInput[] }):
    Promise<commonOutput> {
    const projectId = input.projectId;
    const specDetails = input.row;
    const existEstimation = await this._estimationRepository.getEstimationsByProjectId(projectId)
    if(existEstimation){
      return ResponseHelper.conflictData(EstimationFailedMessage.ALREADY_DONE)
    }
    await this._estimationRepository.createEstimation(specDetails, projectId);
    return ResponseHelper.createdSuccess(EstimationSuccessMessage.ADD);
  }
}