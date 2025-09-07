import { NextFunction, Request, Response } from "express";
import { bannerFailedMessage } from "../../../Shared/Messages/Banner.message";
import { HTTP_STATUS } from "../../../Shared/statusCodes/statusCodes";



export const validateBannerInput = (
   req: Request,
   res: Response,
   next: NextFunction
): void => {
   const { title, subtitle } = req.body;
   const file = req.files?.image as any;

   if (!title || title.trim().length === 0) {
      res.status(HTTP_STATUS.BAD_REQUEST).json({ success: false, message: bannerFailedMessage.TITLE_REQUIRED });
      return;
   }
   if (title.length > 100) {
      res
         .status(HTTP_STATUS.BAD_REQUEST)
         .json({ success: false, message: bannerFailedMessage.TITLE_MAX });
      return;
   }

   if (!subtitle || subtitle.trim().length === 0) {
      res.status(HTTP_STATUS.BAD_REQUEST).json({ success: false, message: bannerFailedMessage.SUBTITLE_REQUIRED });
      return;
   }
   if (subtitle.length > 200) {
      res.status(HTTP_STATUS.BAD_REQUEST).json({
         success: false,
         message: bannerFailedMessage.SUBTITLE_MAX,
      });
      return;
   }

   if (!file) {
      res.status(HTTP_STATUS.BAD_REQUEST).json({ success: false, message: bannerFailedMessage.IMAGE_REQUIRED });
      return;
   }
   const allowedTypes = ["image/jpeg", "image/png", "image/webp"];


   if (!allowedTypes.includes(file.mimetype)) {
      res.status(HTTP_STATUS.BAD_REQUEST).json({
         success: false,
         message: bannerFailedMessage.ALLOWED_IMAGE,
      });
      return;
   }
   next()
}

