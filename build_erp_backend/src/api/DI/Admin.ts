import { JwtService } from '../../application/services/JwtService';
import { AdminLoginUseCase } from '../../application/UseCase/Admin/AdminLogin';
import { BlackListUsecase } from '../../application/UseCase/Auth/Blacklist';
import { AdminRepository } from '../../infrastructure/Repositories/Admin';
import { UserRepository } from '../../infrastructure/Repositories/User';
import { AdminController } from '../controllers/Admin';

const adminRepository = new AdminRepository();
const jwtservice = new JwtService();
const userRepository = new UserRepository();
const adminLoginUsecase = new AdminLoginUseCase(adminRepository,jwtservice);
const blacklistusecase = new BlackListUsecase(userRepository);
export const injectedAdminController = new AdminController(adminLoginUsecase,blacklistusecase,jwtservice);