import { projectMapper } from "../../application/Mapper/project.mapper";
import { sitemanagerMapper } from "../../application/Mapper/sitemanager.mapper.ts";
import { AddSiteToprojectFetchSitemanagerUseCase } from "../../application/usecases/SiteManagerUsecase/AddSiteToprojectFetchSitemanagerUseCase";
import { AddSiteToProjectUseCase } from "../../application/usecases/SiteManagerUsecase/AddSiteToProjectUseCase";
import { DeleteSiteToProjectUseCase } from "../../application/usecases/SiteManagerUsecase/DeleteSitemanagerInProjectUseCase";
import { ListSiteToProjectUsecase } from "../../application/usecases/SiteManagerUsecase/ListSiteToProjectUseCase";
import { AddSiteToProjectRepository } from "../../infrastructure/repositories/AddSiteToProjectRepository";
import { ProjectRepository } from "../../infrastructure/repositories/ProjectRepository";
import { AddSiteManagerToProjectController } from "../controllers/AddSiteManagerToProject";

const addSiteToProjectRepository = new AddSiteToProjectRepository()
const sitemanagermapper = new sitemanagerMapper()
const projectRepository = new ProjectRepository()
const projectmapper = new projectMapper()

const addSiteToprojectFetchSitemanagerUseCase = new AddSiteToprojectFetchSitemanagerUseCase(addSiteToProjectRepository, sitemanagermapper)
const addSiteToProjectUseCase = new AddSiteToProjectUseCase(projectRepository)
const deleteSitetoprojectuseCase = new DeleteSiteToProjectUseCase(projectRepository)
const listSiteToProjectUseCase = new ListSiteToProjectUsecase(addSiteToProjectRepository, projectmapper)

export const injectAddSitemanagerToprojectController = new AddSiteManagerToProjectController(
   addSiteToprojectFetchSitemanagerUseCase, addSiteToProjectUseCase, deleteSitetoprojectuseCase,
   listSiteToProjectUseCase
)