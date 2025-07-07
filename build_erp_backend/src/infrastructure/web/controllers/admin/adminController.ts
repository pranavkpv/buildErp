import { NextFunction, Request, Response } from "express";
import { AdminLoginUseCase } from "../../../../useCases/admin/Dashboard/AdminLoginUseCase";



export class adminController {
  private adminLoginUsecase: AdminLoginUseCase
  constructor(adminLoginUsecase: AdminLoginUseCase) {
    this.adminLoginUsecase = adminLoginUsecase
  }
  login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const result = await this.adminLoginUsecase.execute(req.body)
      if (result.success && result.token?.refreshToken) {
        res.cookie('refreshToken', result.token.refreshToken, {
          httpOnly: true,
          secure:  process.env.NODE_ENV === "production",
          sameSite: 'lax',
          maxAge: 24 * 60 * 60 * 1000,
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
  logout = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      res.clearCookie("refreshToken", {
        httpOnly: false,
        sameSite: "lax", 
        secure: process.env.NODE_ENV === "production"
      });
      res.status(200).json({success:true,message:"Logout successfully"})
    } catch (error) {
      console.log(error)
      next(error)
    }
  }
}
