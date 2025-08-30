import { NextFunction, Request, Response } from "express";
import { HTTP_STATUS } from "../../../Shared/statusCodes/statusCodes";
import { PurchaseFailedMessage } from "../../../Shared/Messages/Purchase.Message";
import { SpecFailedMessage } from "../../../Shared/Messages/Specification.Message";

export const validatePurchase = (req: Request, res: Response, next: NextFunction): void => {
   const { project_id, invoice_number, date, description, materialDetails } = req.body
   if (!project_id) {
      res.status(HTTP_STATUS.BAD_REQUEST).
         json({ success: false, message: PurchaseFailedMessage.PROJECT_REQUIRED })
      return
   }
   if (!invoice_number || invoice_number.trim().length == 0) {
      res.status(HTTP_STATUS.BAD_REQUEST).
         json({ success: false, message: PurchaseFailedMessage.INVOICE_REQUIRED })
      return
   }
   if (invoice_number.length > 20) {
      res.status(HTTP_STATUS.BAD_REQUEST).
         json({ success: false, message: PurchaseFailedMessage.INVOICE_SIZE })
      return
   }
   if (!date) {
      res.status(HTTP_STATUS.BAD_REQUEST).
         json({ success: false, message: PurchaseFailedMessage.DATE_REQUIRED })
      return
   }
   if (new Date(date) > new Date()) {
      res.status(HTTP_STATUS.BAD_REQUEST).
         json({ success: false, message: PurchaseFailedMessage.DATE_FUTURE })
      return
   }
   if (description.length > 100) {
      res.status(HTTP_STATUS.BAD_REQUEST).
         json({ success: false, message: PurchaseFailedMessage.DESCRIPTION_LENGTH })
      return
   }
   if (materialDetails.length == 0) {
      res.status(HTTP_STATUS.BAD_REQUEST).
         json({ success: false, message: PurchaseFailedMessage.DESCRIPTION_LENGTH })
      return
   }
   for (let element of materialDetails) {
      if (!element.material_id) {
         res.status(HTTP_STATUS.BAD_REQUEST).
            json({ success: false, message: PurchaseFailedMessage.MATERIAL_REQUIRED })
         return
      }
      if (element.quantity <= 0) {
         res.status(HTTP_STATUS.BAD_REQUEST).json({
            success: false,
            message: SpecFailedMessage.MATERIAL_QTY_POSITIVE,
         });
         return;
      }
      if (element.unit_rate < 0) {
         res.status(HTTP_STATUS.BAD_REQUEST).json({
            success: false,
            message: SpecFailedMessage.MATERIAL_RATE_POSITIVE,
         });
         return;
      }
   }
   next()
}