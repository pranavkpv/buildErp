import { Request } from 'express';
import { IChatControllerEntity } from '../../domain/Entities/IController/IChat.Controller';
import { IFetchUserUseCase } from '../../application/IUseCases/IStageStatusUpdation/IFetchUser';
import { ResponseHelper } from '../../Shared/responseHelpers/response';
import { IJwtService } from '../../domain/Entities/Service.Entities/IJwtservice';
import { commonOutput } from '../../application/dto/common';
import { chatListDTO } from '../../application/dto/user.dto';

export class ChatController implements IChatControllerEntity {
    constructor(
    private _fetchUseruseCase: IFetchUserUseCase,
    private _jwtService: IJwtService,
    ) { }
    fetchUserDetailsforChat = async(req: Request):
    Promise<commonOutput<chatListDTO[]> | commonOutput> => {
        const userHeader = req.headers.authorization;
        const accessToken = userHeader?.split(' ')[1];
        if (!accessToken) {
            return ResponseHelper.unAuthor();
        }
        const payload = await this._jwtService.verifyAccessToken(accessToken);
        if (!payload) {
            return ResponseHelper.unAuthor();
        }
        const data = await this._fetchUseruseCase.execute(payload._id);
        return data;

    };
}