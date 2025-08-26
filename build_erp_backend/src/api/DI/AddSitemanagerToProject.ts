import { ProjectMapper } from "../../application/Mapper/project.mapper";
import { sitemanagerMapper } from "../../application/Mapper/sitemanager.mapper.ts";
import { AddSiteToProjectUseCase } from "../../application/UseCase/SiteManager/AddSiteToProject";
import { AddSiteToprojectFetchSitemanagerUseCase } from "../../application/UseCase/SiteManager/AddSiteToprojectFetchSitemanager";
import { DeleteSitemanagerUseCase } from "../../application/UseCase/SiteManager/DeleteSitemanager";
import { ListSiteToProjectUsecase } from "../../application/UseCase/SiteManager/ListSiteToProject";
import { AddSiteToProjectRepository } from "../../infrastructure/Repositories/AddSiteToProject";
import { ProjectRepository } from "../../infrastructure/Repositories/Project";
import { SitemanagerRepository } from "../../infrastructure/Repositories/Sitemanager";
import { AddSiteManagerToProjectController } from "../controllers/AddSiteManagerToProject";

const addSiteToProjectRepository = new AddSiteToProjectRepository()
const sitemanagermapper = new sitemanagerMapper()
const projectRepository = new ProjectRepository()
const sitemanagerRepository = new SitemanagerRepository()
const projectmapper = new ProjectMapper()
const fetchSitemanagerUseCase = new AddSiteToprojectFetchSitemanagerUseCase(addSiteToProjectRepository,sitemanagermapper)
const addSiteToProjectUseCase = new AddSiteToProjectUseCase(projectRepository)
const deleteSiteManagerUseCase = new DeleteSitemanagerUseCase(sitemanagerRepository)
const listSiteToProjectUseCase = new ListSiteToProjectUsecase(addSiteToProjectRepository,projectmapper)
export const injectAddSitemanagerToprojectController = new AddSiteManagerToProjectController(fetchSitemanagerUseCase,addSiteToProjectUseCase,deleteSiteManagerUseCase,listSiteToProjectUseCase)