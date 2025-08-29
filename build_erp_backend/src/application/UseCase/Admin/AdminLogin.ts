import { IAdminLoginUseCase } from '../../IUseCases/IAdmin/IAdminLogin';
import { ResponseHelper } from '../../../Shared/responseHelpers/response';
import { JwtService } from '../../services/JwtService';
import { userFailedMessage, userSuccessMessage } from '../../../Shared/Messages/User.Message';
import { commonOutput } from '../../dto/common';
import { inputAdmin } from '../../Entities/admin.entity';
import { IAdminModelEntity } from '../../../domain/Entities/modelEntities/admin.entity';
import { Tokens } from '../../Entities/token.entity';
import { Role } from '../../../Shared/Constants/Role.constant';
import { IAdminRepository } from '../../../domain/Entities/IRepository/IAdmin';

export class AdminLoginUseCase implements IAdminLoginUseCase {
    constructor(
      private _adminRepository: IAdminRepository,
      private _jwtservice: JwtService,
    ) { }
    async execute(input: inputAdmin):
      Promise<commonOutput<{ data: IAdminModelEntity, token: Tokens }> | commonOutput> {
        const existAdmin = await this._adminRepository.getAdminByCredentials(input);
        if (!existAdmin) {
            return ResponseHelper.conflictData(userFailedMessage.INVALID_USER);
        }
        const token = this._jwtservice.generateTokens(existAdmin._id, existAdmin.username, Role.ADMIN);
        return ResponseHelper.success(userSuccessMessage.LOGIN, { data: existAdmin, token });
    }
}
