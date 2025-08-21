import { projectMapper } from "../../application/Mapper/project.mapper";
import { UserMapper } from "../../application/Mapper/user.mapper";
import { AddProjectUseCase } from "../../application/usecases/ProjectUseCase/AddProjectUseCase";
import { ChangeStatusUseCase } from "../../application/usecases/ProjectUseCase/ChangeStatusUseCase";
import { DeleteProjectUseCase } from "../../application/usecases/ProjectUseCase/DeleteProjectUseCase";
import { DisplayAddProjectUseCase } from "../../application/usecases/ProjectUseCase/DisplayAddProjectUseCase";
import { DisplayAllProjectUseCase } from "../../application/usecases/ProjectUseCase/DisplayAllProjectUseCase";
import { EditProjectUseCase } from "../../application/usecases/ProjectUseCase/EditProjectUseCase";
import { FetchProjectUseCase } from "../../application/usecases/ProjectUseCase/fetchProjectUseCase";
import { AddSiteToprojectFetchProjectUseCase } from "../../application/usecases/SiteManagerUsecase/AddSiteToprojectFetchProjectUseCase";
import { AddSiteToProjectRepository } from "../../infrastructure/repositories/AddSiteToProjectRepository";
import { EstimationRepository } from "../../infrastructure/repositories/EstimationRepository";
import { ProjectRepository } from "../../infrastructure/repositories/ProjectRepository";
import { ProjectStockRepository } from "../../infrastructure/repositories/ProjectStockRepository";
import { UserRepository } from "../../infrastructure/repositories/user.repository";
import { ProjectController } from "../controllers/project.controller";

const projectRepository = new ProjectRepository()
const projectmapper = new projectMapper()
const addSiteToprojectRepository = new AddSiteToProjectRepository()
const userRepository = new UserRepository()
const userMapper = new UserMapper()
const projectStockRepository = new ProjectStockRepository()
const estimationRepository = new EstimationRepository()

const fetchProjectUseCase = new FetchProjectUseCase(projectRepository,projectmapper)
const addSiteToprojectFetchProjectUseCase = new AddSiteToprojectFetchProjectUseCase(addSiteToprojectRepository,projectmapper)
const displayAddProjectUseCase = new DisplayAddProjectUseCase(userRepository,userMapper)
const addProjectUseCase = new AddProjectUseCase(projectRepository)
const removeProjectUseCase = new DeleteProjectUseCase(projectRepository,projectStockRepository,estimationRepository)
const editProjectUseCase = new EditProjectUseCase(projectRepository)
const displayProjectUseCase = new DisplayAllProjectUseCase(projectRepository,projectmapper)
const changeStatusUseCase = new ChangeStatusUseCase(projectRepository)

export const injectedProjectController = new ProjectController(fetchProjectUseCase,addSiteToprojectFetchProjectUseCase,
   displayAddProjectUseCase,addProjectUseCase,removeProjectUseCase,editProjectUseCase,displayProjectUseCase,changeStatusUseCase)