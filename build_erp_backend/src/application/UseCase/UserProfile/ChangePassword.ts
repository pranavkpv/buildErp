import { IChangePasswordUseCase } from '../../IUseCases/IUserProfile/IChangePassword';
import { ResponseHelper } from '../../../Shared/responseHelpers/response';
import { userFailedMessage, userSuccessMessage } from '../../../Shared/Messages/User.Message';
import { IUserRepository } from '../../../domain/Entities/IRepository/IUser';
import { IHasher } from '../../../domain/Entities/IRepository/IHasher';
import { updatePasswordInput } from '../../entities/user.entity';
import { commonOutput } from '../../dto/common';

export class ChangePasswordUsecase implements IChangePasswordUseCase {
    constructor(
      private _userRepository: IUserRepository,
      private _hasher: IHasher,
    ) { }
    async execute(input: updatePasswordInput): Promise<commonOutput> {
        const { _id, email, currentpassword, password } = input;
        const existUser = await this._userRepository.getAuthUserByEmail(email);
        if (existUser) {
            return ResponseHelper.badRequest(userFailedMessage.EXIST_GOOGLE);
        }
        const userById = await this._userRepository.getUserById(_id);
        if (!userById) {
            return ResponseHelper.badRequest(userFailedMessage.USER_NOT_FOUND);
        }
        const hashedCurrentPassword = await this._hasher.compare(currentpassword, userById.password);
        if (!hashedCurrentPassword) {
            return ResponseHelper.conflictData(userFailedMessage.CURRENTPASSWORD_WRONG);
        }
        
        const hashedPassword = await this._hasher.hash(password);
        await this._userRepository.updateUserPassword(_id, hashedPassword);
        return ResponseHelper.success(userSuccessMessage.PASSWORD_UPDATE);
    }
}