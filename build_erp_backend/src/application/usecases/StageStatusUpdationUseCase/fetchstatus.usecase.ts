import { IStageRepository } from "../../../domain/interfaces/Project-management/IStageRepository";
import { IFetchStatusUseCase } from "../../interfaces/SitemanagerUseCaseEntities/StageStatusUpdationUseCaseEntities/IFetchstatus.usecase";
import { ResponseHelper } from "../../../Shared/responseHelpers/response";
import { StageSuccessMessage } from "../../../Shared/Messages/Stage.Message";
import { commonOutput } from "../../dto/common";
import { publicstageDTO } from "../../dto/stage.dto";
import { IStagemapper } from "../../../domain/mappers/IStage.mapper";

export class FetchStatusUseCase implements IFetchStatusUseCase {
   constructor(
      private _stageRepository: IStageRepository,
      private _stagemapper: IStagemapper
   ) { }
   async execute(_id: string): Promise<commonOutput<publicstageDTO[]>> {
      const data = await this._stageRepository.findStageByprojectId(_id)
      const mappedStage = this._stagemapper.topublicStageDto(data)
      return ResponseHelper.success(StageSuccessMessage.FETCH, mappedStage)
   }
}