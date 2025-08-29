import { ProjectMapper } from '../../application/Mapper/project.mapper';
import { sitemanagerMapper } from '../../application/Mapper/sitemanager.mapper.ts';
import { AddSiteToProjectUseCase } from '../../application/UseCase/SiteManager/AddSiteToProject';
import { AddSiteToprojectFetchSitemanagerUseCase } from '../../application/UseCase/SiteManager/AddSiteToprojectFetchSitemanager';
import { DeleteSiteToProjectUseCase } from '../../application/UseCase/SiteManager/DeleteSitemanagerInProject';
import { ListSiteToProjectUsecase } from '../../application/UseCase/SiteManager/ListSiteToProject';
import { AddSiteToProjectRepository } from '../../infrastructure/Repositories/AddSiteToProject';
import { ProjectRepository } from '../../infrastructure/Repositories/Project';
import { AddSiteManagerToProjectController } from '../controllers/AddSiteManagerToProject';

const addSiteToProjectRepository = new AddSiteToProjectRepository();
const sitemanagermapper = new sitemanagerMapper();
const projectRepository = new ProjectRepository();
const projectmapper = new ProjectMapper();
const fetchSitemanagerUseCase = new AddSiteToprojectFetchSitemanagerUseCase(addSiteToProjectRepository,sitemanagermapper);
const addSiteToProjectUseCase = new AddSiteToProjectUseCase(projectRepository);
const deleteSiteManagerUseCase = new DeleteSiteToProjectUseCase(projectRepository);
const listSiteToProjectUseCase = new ListSiteToProjectUsecase(addSiteToProjectRepository,projectmapper);
export const injectAddSitemanagerToprojectController = new AddSiteManagerToProjectController(fetchSitemanagerUseCase,addSiteToProjectUseCase,deleteSiteManagerUseCase,listSiteToProjectUseCase);