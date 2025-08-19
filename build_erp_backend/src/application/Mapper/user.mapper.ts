import { IUserMapper } from "../../domain/mappers/IUser.mapper";
import { IUserModelEntity } from "../../domain/Entities/modelEntities/user.entity";
import { userLoginDTO } from "../dto/user.dto";

export class UserMapper implements IUserMapper {
  touserLoginDTO(user: IUserModelEntity): userLoginDTO {
    return {
      _id: user._id,
      email: user.email,
      username: user.username,
      phone: user.phone,
      profile_image: user.profile_image
    }
  }
}