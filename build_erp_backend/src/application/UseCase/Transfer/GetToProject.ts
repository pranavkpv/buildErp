import { IGetToProjectUseCase } from '../../IUseCases/ITransfer/IGetToProject';
import { ResponseHelper } from '../../../Shared/responseHelpers/response';
import { ProjectSuccessMessage } from '../../../Shared/Messages/Project.Message';
import { ITransferRepository } from '../../../domain/Entities/IRepository/ITransfer';
import { commonOutput } from '../../dto/common';
import { fetchProjectIdnameDTO } from '../../dto/project.dto';

export class GetToProjectUseCase implements IGetToProjectUseCase {
    constructor(
      private _transferRepository: ITransferRepository,
    ) { }
    async execute(projectId: string):
      Promise<commonOutput<fetchProjectIdnameDTO[]> | commonOutput> {
        const data = await this._transferRepository.fectToproject(projectId);
        return ResponseHelper.success(ProjectSuccessMessage.FETCH, data);
    }
}