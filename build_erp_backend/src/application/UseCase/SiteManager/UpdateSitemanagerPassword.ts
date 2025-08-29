
import { IHasher } from '../../../domain/Entities/IRepository/IHasher';
import { ISitemanagerRepository } from '../../../domain/Entities/IRepository/ISitemanager';
import { IUpdateSitemanagerPasswordUseCase } from '../../IUseCases/ISitemanager/IUpdateSitemanagerPassword';
import { SitemanagerFailedMessage, SitemanagerSuccessMessage } from '../../../Shared/Messages/Sitemanager.Message';
import { ResponseHelper } from '../../../Shared/responseHelpers/response';
import { changePasswordInput } from '../../Entities/sitemanager.entity';
import { commonOutput } from '../../dto/common';



export class UpdateSitemanagerPasswordUseCase implements IUpdateSitemanagerPasswordUseCase {
    constructor(
      private _sitemanagerRepository: ISitemanagerRepository,
      private _hasher: IHasher,
    ) { }
    async execute(input: changePasswordInput): Promise<commonOutput> {
        console.log(input);
        const { _id, password, changedpassword } = input;
        const loginData = await this._sitemanagerRepository.getSitemanagerById(_id);
        if (!loginData) {
            return ResponseHelper.badRequest(SitemanagerFailedMessage.NOT_EXIST);
        }
        console.log(loginData);
        const passwordCheck = await this._hasher.compare(password, loginData?.password);
        if (!passwordCheck) {
            return ResponseHelper.badRequest(SitemanagerFailedMessage.PASSWORD_WRONG);
        }
        const hashPassword = await this._hasher.hash(changedpassword);
        await this._sitemanagerRepository.updateSitemanagerPassword({ _id, password: hashPassword });
        return ResponseHelper.success(SitemanagerSuccessMessage.UPDATE_PASSWORD);
    }
}