import { BannerMapper } from '../../application/Mapper/banner.mapper';
import { AddBannerUseCase } from '../../application/UseCase/Banner/AddBanner';
import { DeleteBannerUseCase } from '../../application/UseCase/Banner/DeleteBanner';
import { EditBannerUseCase } from '../../application/UseCase/Banner/EditBanner';
import { FetchAllBannerUseCase } from '../../application/UseCase/Banner/FetchAllBanner';
import { ListBannerUseCase } from '../../application/UseCase/Banner/ListBanner';
import { BannerRepository } from '../../infrastructure/Repositories/Banner';
import { BannerController } from '../controllers/Banner.controller';

const bannerRepository = new BannerRepository();
const bannermapper = new BannerMapper();
const addBannerUseCase = new AddBannerUseCase(bannerRepository);
const listBannerUseCase = new ListBannerUseCase(bannerRepository,bannermapper);
const editBannerUseCase = new EditBannerUseCase(bannerRepository);
const deleteBannerUsecase = new DeleteBannerUseCase(bannerRepository);
const fetchAllBannerUseCase = new FetchAllBannerUseCase(bannerRepository,bannermapper);
export const injectedBannerController = new BannerController(addBannerUseCase,listBannerUseCase,editBannerUseCase,deleteBannerUsecase,fetchAllBannerUseCase);