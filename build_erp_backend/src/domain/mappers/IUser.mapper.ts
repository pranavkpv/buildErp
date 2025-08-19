import { userLoginDTO } from "../../application/dto/user.dto";
import { IUserModelEntity } from "../Entities/modelEntities/user.entity";

export interface IUserMapper {
   touserLoginDTO(user:IUserModelEntity):userLoginDTO
}