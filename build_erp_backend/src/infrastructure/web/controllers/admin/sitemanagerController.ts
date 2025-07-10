import { NextFunction, Request, Response } from "express"
import { DisplayAllSitemanagerUseCase } from "../../../../useCases/admin/Site/sitemanager"
import { SaveSitemanagerUseCase } from "../../../../useCases/admin/Site/SaveSitemanagerUseCase"
import { UpdateSitemanagerUseCase } from "../../../../useCases/admin/Site/UpdateSitemanagerUseCase"
import { DeleteSitemanagerUseCase } from "../../../../useCases/admin/Site/DeleteSitemanagerUseCase"
import { SitemanagerLoginUseCase } from "../../../../useCases/sitemanager/Dashboard/SitemanagerLoginUseCase"
import { JwtPayload } from "jsonwebtoken"
import { ListProjectUseCase } from "../../../../useCases/sitemanager/Common/ListProjectUseCase"



export class SitemanagerController {
   private displayAllSitemanagerUseCase: DisplayAllSitemanagerUseCase
   private addSitemanagerUseCase: SaveSitemanagerUseCase
   private editSitemanagerUsecase: UpdateSitemanagerUseCase
   private deleteSitemanagerUseCase: DeleteSitemanagerUseCase
   private sitemanagerLoginUseCase: SitemanagerLoginUseCase
   private listProjectUseCase : ListProjectUseCase
   constructor(
      displayAllSitemanagerUseCase: DisplayAllSitemanagerUseCase,
      addSitemanagerUseCase: SaveSitemanagerUseCase,
      editSitemanagerUsecase: UpdateSitemanagerUseCase,
      deleteSitemanagerUseCase: DeleteSitemanagerUseCase,
      sitemanagerLoginUseCase: SitemanagerLoginUseCase,
      listProjectUseCase : ListProjectUseCase
   ) {
      this.displayAllSitemanagerUseCase = displayAllSitemanagerUseCase
      this.addSitemanagerUseCase = addSitemanagerUseCase
      this.editSitemanagerUsecase = editSitemanagerUsecase
      this.deleteSitemanagerUseCase = deleteSitemanagerUseCase
      this.sitemanagerLoginUseCase = sitemanagerLoginUseCase
      this.listProjectUseCase = listProjectUseCase
   }
   getSitemanager = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      try {
         const { page, search } = req.query
         const result = await this.displayAllSitemanagerUseCase.execute(Number(page), String(search))
         res.status(200).json(result)
      } catch (error) {
         console.log(error)
         next(error)
      }
   }
   addSitemanager = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      try {
         const result = await this.addSitemanagerUseCase.execute(req.body)
         res.status(200).json(result)
      } catch (error) {
         console.log(error)
         next(error)
      }
   }
   editSitemanager = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      try {
         const result = await this.editSitemanagerUsecase.execute(req.body)
         res.status(200).json(result)
      } catch (error) {
         console.log(error)
         next(error)
      }
   }
   deleteSitemanager = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      try {
         const result = await this.deleteSitemanagerUseCase.execute(req.body)
         res.status(200).json(result)
      } catch (error) {
         console.log(error)
         next(error)
      }
   }
   loginSitemanager = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      try {
         const { email, password } = req.body
         const result = await this.sitemanagerLoginUseCase.execute(email, password)
         if (result.success && result.token?.refreshToken) {
            res.cookie('refreshToken', result.token.refreshToken, {
               httpOnly: true,
               secure:  process.env.NODE_ENV === "production",
               sameSite: 'lax',
               maxAge: 24 * 60 * 60 * 1000,
               path: '/',
            });
            res.status(200).json(result)
         } else {
            res.status(200).json(result)
         }
      } catch (error) {
         console.log(error)
         next(error)
      }
   }
   logoutSitemanager = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      try {
         res.clearCookie('refreshToken', {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            path: '/',
         });
         res.status(200).json({ success: true, message: "Logout successfully" })
      } catch (error) {
         console.log(error)
         next(error)
      }
   }
   getSitemanagerProject = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      try {
         const {user} = req.query
         const result = await this.listProjectUseCase.execute(String(user))
         res.status(200).json(result)
      } catch (error) {
         console.log(error)
         next(error)
      }
   }
}



