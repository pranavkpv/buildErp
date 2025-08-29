import { IHasher } from '../../../domain/Entities/IRepository/IHasher';
import { IUserRepository } from '../../../domain/Entities/IRepository/IUser';
import { userFailedMessage, userSuccessMessage } from '../../../Shared/Messages/User.Message';
import { ResponseHelper } from '../../../Shared/responseHelpers/response';
import { commonOutput } from '../../dto/common';
import { loginInput } from '../../Entities/user.entity';
import { IUpdatePasswordUseCase } from '../../IUseCases/IAuth/IUpdatepassword';

export class UpdatePasswordUseCase implements IUpdatePasswordUseCase {
    constructor(
      private _userRepository: IUserRepository,
      private _hasher: IHasher,
    ) { }
    async execute(input: loginInput): Promise<commonOutput> {
        const { email, password } = input;
        const existUser = await this._userRepository.getUserByEmail(email);
        if (!existUser) {
            return ResponseHelper.badRequest(userFailedMessage.USER_NOT_FOUND);
        }
        const hashedPass = await this._hasher.hash(password);
        await this._userRepository.updateUserPassword(existUser._id, hashedPass);
        return ResponseHelper.success(userSuccessMessage.PASSWORD_UPDATE);
    }
}