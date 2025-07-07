import { NextFunction, Request, Response } from "express";
import { AddSiteToProjectUseCase } from "../../../../useCases/admin/Site/AddSiteToProjectUseCase";
import { ListSiteToProject } from "../../../../useCases/admin/Site/ListSiteToProjectUseCase";
import { DeleteSiteToProjectUseCase } from "../../../../useCases/admin/Site/DeleteSitemanagerInProjectUseCase";
import { AddSiteToprojectFetchProjectUseCase } from "../../../../useCases/admin/Site/AddSiteToprojectFetchProjectUseCase";
import { AddSiteToprojectFetchSitemanagerUseCase } from "../../../../useCases/admin/Site/AddSiteToprojectFetchSitemanagerUseCase";


export class AddSiteController {
   private addSiteToProjectUseCase: AddSiteToProjectUseCase
   private listSiteToProjectUseCase : ListSiteToProject
   private deleteSitetoprojectuseCase : DeleteSiteToProjectUseCase
   private addSiteToprojectFetchProjectUseCase : AddSiteToprojectFetchProjectUseCase
   private addSiteToprojectFetchSitemanagerUseCase : AddSiteToprojectFetchSitemanagerUseCase
   constructor(addSiteToProjectUseCase: AddSiteToProjectUseCase,listSiteToProjectUseCase : ListSiteToProject,deleteSitetoprojectuseCase : DeleteSiteToProjectUseCase,addSiteToprojectFetchProjectUseCase : AddSiteToprojectFetchProjectUseCase,addSiteToprojectFetchSitemanagerUseCase : AddSiteToprojectFetchSitemanagerUseCase) {
      this.addSiteToProjectUseCase = addSiteToProjectUseCase
      this.listSiteToProjectUseCase = listSiteToProjectUseCase
      this.deleteSitetoprojectuseCase = deleteSitetoprojectuseCase
      this.addSiteToprojectFetchProjectUseCase = addSiteToprojectFetchProjectUseCase
      this.addSiteToprojectFetchSitemanagerUseCase = addSiteToprojectFetchSitemanagerUseCase
   }
   saveData = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      try {
         const result = await this.addSiteToProjectUseCase.execute(req.body)
         res.status(200).json(result)
      } catch (error) {
         console.log(error)
         next(error)
      }
   }
   listSite = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      try {
       const {page,search } = req.query
         const result = await this.listSiteToProjectUseCase.execute(Number(page),String(search))
         res.status(200).json(result)
      } catch (error) {
         console.log(error)
         next(error)
      }
   }
     deleteSite = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      try {
         const result = await this.deleteSitetoprojectuseCase.execute(req.body)
         res.status(200).json(result)
      } catch (error) {
         console.log(error)
         next(error)
      }
   }
   fetchProject = async(req: Request, res: Response, next: NextFunction):Promise<void> =>{
      try {
         const result = await this.addSiteToprojectFetchProjectUseCase.execute()
         res.status(200).json(result)
      } catch (error) {
         console.log(error)
         next(error)
      }
   }
   fetchSitemanager = async(req: Request, res: Response, next: NextFunction):Promise<void> =>{
      try {
         const result = await this.addSiteToprojectFetchSitemanagerUseCase.execute()
         res.status(200).json(result)
      } catch (error) {
         console.log(error)
         next(error)
      }
   }

}
