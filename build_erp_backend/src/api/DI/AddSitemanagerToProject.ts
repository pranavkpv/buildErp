import { ProjectMapper } from '../../application/Mapper/project.mapper';
import { sitemanagerMapper } from '../../application/Mapper/sitemanager.mapper.ts';
import { AddSiteToProjectUseCase } from '../../application/UseCase/SiteManager/AddSiteToProject';
import { AddSiteToprojectFetchSitemanagerUseCase } from '../../application/UseCase/SiteManager/AddSiteToprojectFetchSitemanager';
import { DeleteSiteToProjectUseCase } from '../../application/UseCase/SiteManager/DeleteSitemanagerInProject';
import { ListSiteToProjectUsecase } from '../../application/UseCase/SiteManager/ListSiteToProject';
import { AddSiteToProjectRepository } from '../../infrastructure/Repositories/AddSiteToProject';
import { AttendanceRepository } from '../../infrastructure/Repositories/Attendance';
import { ProjectRepository } from '../../infrastructure/Repositories/Project';
import { PurchaseRepository } from '../../infrastructure/Repositories/Purchase';
import { ReceiveRepository } from '../../infrastructure/Repositories/Receive';
import { TransferRepository } from '../../infrastructure/Repositories/Transfer';
import { AddSiteManagerToProjectController } from '../controllers/AddSiteManagerToProject';

const addSiteToProjectRepository = new AddSiteToProjectRepository();
const sitemanagermapper = new sitemanagerMapper();
const projectRepository = new ProjectRepository();
const projectmapper = new ProjectMapper();
const purchaseRepository = new PurchaseRepository()
const transferRepository = new TransferRepository()
const receiveRepository = new ReceiveRepository()
const attendanceRepository = new AttendanceRepository()
const fetchSitemanagerUseCase = new AddSiteToprojectFetchSitemanagerUseCase(addSiteToProjectRepository,sitemanagermapper);
const addSiteToProjectUseCase = new AddSiteToProjectUseCase(projectRepository);
const deleteSiteManagerUseCase = new DeleteSiteToProjectUseCase(projectRepository,purchaseRepository,transferRepository,receiveRepository,attendanceRepository);
const listSiteToProjectUseCase = new ListSiteToProjectUsecase(addSiteToProjectRepository,projectmapper);
export const injectAddSitemanagerToprojectController = new AddSiteManagerToProjectController(fetchSitemanagerUseCase,addSiteToProjectUseCase,deleteSiteManagerUseCase,listSiteToProjectUseCase);