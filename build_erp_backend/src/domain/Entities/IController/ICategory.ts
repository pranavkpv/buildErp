import { NextFunction, Request, Response } from "express";
import { commonOutput } from "../../../application/dto/common";
import { categoryListDTO } from "../../../application/dto/category.dto";


export interface ICategoryController {

   createCategory(req: Request, res: Response, next: NextFunction):
      Promise<commonOutput | void>

   getAllCategories(req: Request, res: Response, next: NextFunction):
      Promise<commonOutput<{ data: categoryListDTO[], totalPages: number }> | void>

   updateCategory(req: Request, res: Response, next: NextFunction):
      Promise<commonOutput | void>

   deleteCategory(req: Request, res: Response, next: NextFunction):
      Promise<commonOutput | void>
}