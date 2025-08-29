import { IJwtService } from '../../../domain/Entities/Service.Entities/IJwtservice';
import { ISitemanagerRepository } from '../../../domain/Entities/IRepository/ISitemanager';
import { IUserRepository } from '../../../domain/Entities/IRepository/IUser';
import { Role } from '../../../Shared/Constants/Role.constant';
import { userFailedMessage, userSuccessMessage } from '../../../Shared/Messages/User.Message';
import { ResponseHelper } from '../../../Shared/responseHelpers/response';
import { commonOutput } from '../../dto/common';
import { IRefreshTokenUseCase } from '../../IUseCases/IAuth/IRefreshToken';
import { IAdminRepository } from '../../../domain/Entities/IRepository/IAdmin';

export class RefreshTokenUseCase implements IRefreshTokenUseCase {
    constructor(
    private _userRepository: IUserRepository,
    private _JwtService: IJwtService,
    private _adminRepository: IAdminRepository,
    private _sitemanagerRepository: ISitemanagerRepository,
    ) { }
    async execute(refreshToken: string): Promise<commonOutput<string> | commonOutput> {
        const payload = this._JwtService.verifyRefreshToken(refreshToken);
        if (!payload) throw new Error(userFailedMessage.INVALID_USER);
        let user;
        if (payload.role === Role.USER) {
            user = await this._userRepository.getUserById(payload._id);
        } else if (payload.role === Role.ADMIN) {
            user = await this._adminRepository.getAdminById(payload._id);
        } else if (payload.role === Role.SITEMANAGER){
            user = await this._sitemanagerRepository.getSitemanagerById(payload._id);
        } else {
            return ResponseHelper.badRequest(userFailedMessage.INVALID_USER);
        }
        if (!user) throw new Error(userFailedMessage.USER_NOT_FOUND);
        const accessToken = this._JwtService.createAccessToken({ _id: user._id, username: user.username, role: payload.role });
        return ResponseHelper.success(userSuccessMessage.ACCESSTOKEN_CREATE, accessToken);
    }
}