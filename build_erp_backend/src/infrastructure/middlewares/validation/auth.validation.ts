import { Request, Response, NextFunction } from "express";
import { commonFailedMessage } from "../../../Shared/Messages/Common.Message";
import { userFailedMessage } from "../../../Shared/Messages/User.Message";
import { AToZ, aToz } from "../../../Shared/Constants/Character.constant";
import { phoneStart, zeroToNine } from "../../../Shared/Constants/Number.constant";
import { HTTP_STATUS } from "../../../Shared/statusCodes/statusCodes";



type AsyncHandler = (req: Request, res: Response, next: NextFunction) => void;

//signup
export const validateSignup: AsyncHandler = async (req, res, next) => {
   const { username, email, phone, password } = req.body;
   if (!username || !email || !phone || !password) {
      res.status(HTTP_STATUS.BAD_REQUEST).json({ success: false, message: commonFailedMessage.FIELD_REQUIRED })
      return
   }
   const trimmedUsername = username.trim();
   const trimmedEmail = email.trim();
   const trimmedPhone = phone.trim();
   const trimmedPassword = password.trim();

   if (trimmedUsername.length < 3) {
      res.status(HTTP_STATUS.BAD_REQUEST).json({ success: false, message: userFailedMessage.MIN_LIMIT_USER_NAME })
      return
   }
   if (trimmedUsername.length > 20) {
      res.status(HTTP_STATUS.BAD_REQUEST).json({ success: false, message: userFailedMessage.MAX_LIMIT_USER_NAME })
      return
   }

   for (let char of trimmedUsername) {
      if (char !== " " && !(aToz.includes(char) || AToZ.includes(char))) {
         res.status(HTTP_STATUS.BAD_REQUEST).json({ success: false, message: userFailedMessage.EXIST_CHAR })
         return
      }
   }

   if (trimmedEmail.length < 10) {
      res.status(HTTP_STATUS.BAD_REQUEST).json({ success: false, message: userFailedMessage.MIN_LIMIT_EMAIL })
      return
   }
   if (trimmedEmail.length > 50) {
      res.status(HTTP_STATUS.BAD_REQUEST).json({ success: false, message: userFailedMessage.MAX_LIMIT_EMAIL })
      return
   }
   if (!trimmedEmail.includes("@") || !trimmedEmail.includes(".")) {
      res.status(HTTP_STATUS.BAD_REQUEST).json({ success: false, message: userFailedMessage.INVALID_EMAIL })
      return
   }
   if (trimmedEmail.startsWith("@") || trimmedEmail.endsWith("@") || trimmedEmail.endsWith(".")) {
      res.status(HTTP_STATUS.BAD_REQUEST).json({ success: false, message: userFailedMessage.INVALID_EMAIL })
      return
   }

   for (let char of trimmedPhone) {
      if (!zeroToNine.includes(Number(char))) {
         res.status(HTTP_STATUS.BAD_REQUEST).json({ success: false, message: userFailedMessage.INVALID_PHONE })
         return
      }
   }

   if (!phoneStart.includes(Number(trimmedPhone[0]))) {
      res.status(HTTP_STATUS.BAD_REQUEST).json({ success: false, message: userFailedMessage.INVALID_PHONE })
      return
   }
   if (trimmedPhone.length !== 10) {
      res.status(HTTP_STATUS.BAD_REQUEST).json({ success: false, message: userFailedMessage.INVALID_PHONE_LENGTH })
      return
   }

   if (trimmedPassword.length < 8) {
      res.status(HTTP_STATUS.BAD_REQUEST).json({ success: false, message: userFailedMessage.MIN_LIMIT_PASSWORD })
      return
   }
   if (trimmedPassword.length > 20) {
      res.status(HTTP_STATUS.BAD_REQUEST).json({ success: false, message: userFailedMessage.MAX_LIMIT_PASSWORD })
      return
   }

   const hasUpper = /[A-Z]/.test(trimmedPassword);
   const hasLower = /[a-z]/.test(trimmedPassword);
   const hasNumber = /[0-9]/.test(trimmedPassword);
   const hasSpecial = /[@$!%*?&]/.test(trimmedPassword);

   if (!hasUpper || !hasLower || !hasNumber || !hasSpecial) {
      res.status(HTTP_STATUS.BAD_REQUEST).json({ success: false, message: userFailedMessage.WEAK_PASSWORD })
      return
   }
   next();
};


//verifyOtp
export const validateVerifyotp = (req: Request, res: Response, next: NextFunction): void => {
   const { otp, email } = req.body
   if (!email || !otp) {
      res.status(HTTP_STATUS.BAD_REQUEST).json({success:false,message:commonFailedMessage.FIELD_REQUIRED});
      return
   }
   if (otp.length != 6) {
      res.status(HTTP_STATUS.BAD_REQUEST).json({success:false,message:userFailedMessage.MIS_MATCH_OTP_LENGTH})
      return
   }
   for (let item of otp) {
      if (!zeroToNine.includes(Number(item))) {
         res.status(HTTP_STATUS.BAD_REQUEST).json({success:false,message:userFailedMessage.INVALID_OTP})
         return
      }
   }
   next()
}

//resendotp
export const validateResendotp = (req: Request, res: Response, next: NextFunction): void => {
   const { email } = req.body
   if (!email) {
      res.status(HTTP_STATUS.BAD_REQUEST).json({success:false,message:userFailedMessage.INVALID_EMAIL})
      return
   }
   next()
}

//user login
export const validateUserLogin = (req: Request, res: Response, next: NextFunction): void => {
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(HTTP_STATUS.BAD_REQUEST).json({ success: false, message: commonFailedMessage.FIELD_REQUIRED });
        return;
    }

    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    if (trimmedEmail.length < 10) {
        res.status(HTTP_STATUS.BAD_REQUEST).json({ success: false, message: userFailedMessage.MIN_LIMIT_EMAIL });
        return;
    }

    if (trimmedEmail.length > 50) {
        res.status(HTTP_STATUS.BAD_REQUEST).json({ success: false, message: userFailedMessage.MAX_LIMIT_EMAIL });
        return;
    }

    if (!trimmedEmail.includes("@") || !trimmedEmail.includes(".")) {
        res.status(HTTP_STATUS.BAD_REQUEST).json({ success: false, message: userFailedMessage.INVALID_EMAIL });
        return;
    }

    if (trimmedEmail.startsWith("@") || trimmedEmail.endsWith("@") || trimmedEmail.endsWith(".")) {
        res.status(HTTP_STATUS.BAD_REQUEST).json({ success: false, message: userFailedMessage.INVALID_EMAIL });
        return;
    }

    if (trimmedPassword.length < 8) {
        res.status(HTTP_STATUS.BAD_REQUEST).json({ success: false, message: userFailedMessage.MIN_LIMIT_PASSWORD });
        return;
    }

    if (trimmedPassword.length > 20) {
        res.status(HTTP_STATUS.BAD_REQUEST).json({ success: false, message: userFailedMessage.MAX_LIMIT_PASSWORD });
        return;
    }

    const hasUpper = /[A-Z]/.test(trimmedPassword);
    const hasLower = /[a-z]/.test(trimmedPassword);
    const hasNumber = /[0-9]/.test(trimmedPassword);
    const hasSpecial = /[@$!%*?&]/.test(trimmedPassword);

    if (!hasUpper || !hasLower || !hasNumber || !hasSpecial) {
        res.status(HTTP_STATUS.BAD_REQUEST).json({ success: false, message: userFailedMessage.WEAK_PASSWORD });
        return;
    }

    next();
};

//forgot otp send
export const validateForgotOtpSend = (req: Request, res: Response, next: NextFunction): void => {
    const { email } = req.body;

    if (!email) {
        res.status(HTTP_STATUS.BAD_REQUEST).json({ success: false, message: commonFailedMessage.FIELD_REQUIRED });
        return;
    }

    const trimmedEmail = email.trim();

    if (trimmedEmail.length < 10) {
        res.status(HTTP_STATUS.BAD_REQUEST).json({ success: false, message: userFailedMessage.MIN_LIMIT_EMAIL });
        return;
    }

    if (trimmedEmail.length > 50) {
        res.status(HTTP_STATUS.BAD_REQUEST).json({ success: false, message: userFailedMessage.MAX_LIMIT_EMAIL });
        return;
    }

    if (!trimmedEmail.includes("@") || !trimmedEmail.includes(".")) {
        res.status(HTTP_STATUS.BAD_REQUEST).json({ success: false, message: userFailedMessage.INVALID_EMAIL });
        return;
    }

    if (trimmedEmail.startsWith("@") || trimmedEmail.endsWith("@") || trimmedEmail.endsWith(".")) {
        res.status(HTTP_STATUS.BAD_REQUEST).json({ success: false, message: userFailedMessage.INVALID_EMAIL });
        return;
    }

    next();
};
