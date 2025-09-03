import { NextFunction, Request, Response } from 'express';
import { HTTP_STATUS } from '../../../Shared/statusCodes/statusCodes';
import { commonFailedMessage } from '../../../Shared/Messages/Common.Message';
import { userFailedMessage } from '../../../Shared/Messages/User.Message';
import { AToZ, aToz } from '../../../Shared/Constants/Character.constant';
import { phoneStart, zeroToNine } from '../../../Shared/Constants/Number.constant';
import { FileArray, UploadedFile } from 'express-fileupload';
import { EstimationFailedMessage } from '../../../Shared/Messages/Estimation.Message';

//update profile
export const validateUpdateprofile = (req: Request, res: Response, next: NextFunction): void => {
    const { username, email, phone } = req.body;
    if (!username || !email || !phone) {
        res.status(HTTP_STATUS.BAD_REQUEST).json(commonFailedMessage.FIELD_REQUIRED);
        return;
    }
    const trimmedUsername = username.trim();
    const trimmedEmail = email.trim();
    const trimmedPhone = phone.trim();

    if (trimmedUsername.length < 3) {
        res.status(HTTP_STATUS.BAD_REQUEST).json(userFailedMessage.MIN_LIMIT_USER_NAME);
        return;
    }
    if (trimmedUsername.length > 20) {
        res.status(HTTP_STATUS.BAD_REQUEST).json(userFailedMessage.MAX_LIMIT_USER_NAME);
        return;
    }

    for (const char of trimmedUsername) {
        if (char !== ' ' && !(aToz.includes(char) || AToZ.includes(char))) {
            res.status(HTTP_STATUS.BAD_REQUEST).json(userFailedMessage.EXIST_CHAR);
            return;
        }
    }

    if (trimmedEmail.length < 10) {
        res.status(HTTP_STATUS.BAD_REQUEST).json(userFailedMessage.MIN_LIMIT_EMAIL);
        return;
    }
    if (trimmedEmail.length > 50) {
        res.status(HTTP_STATUS.BAD_REQUEST).json(userFailedMessage.MAX_LIMIT_EMAIL);
        return;
    }
    if (!trimmedEmail.includes('@') || !trimmedEmail.includes('.')) {
        res.status(HTTP_STATUS.BAD_REQUEST).json(userFailedMessage.INVALID_EMAIL);
        return;
    }
    if (trimmedEmail.startsWith('@') || trimmedEmail.endsWith('@') || trimmedEmail.endsWith('.')) {
        res.status(HTTP_STATUS.BAD_REQUEST).json(userFailedMessage.INVALID_EMAIL);
        return;
    }

    for (const char of trimmedPhone) {
        if (!zeroToNine.map((n) => String(n)).includes(char)) {
            res.status(HTTP_STATUS.BAD_REQUEST).json(userFailedMessage.INVALID_PHONE);
            return;
        }
    }
    if (!phoneStart.includes(trimmedPhone[0])) {
        res.status(HTTP_STATUS.BAD_REQUEST).json(userFailedMessage.INVALID_PHONE);
        return;
    }
    if (trimmedPhone.length !== 10) {
        res.status(HTTP_STATUS.BAD_REQUEST).json(userFailedMessage.INVALID_PHONE_LENGTH);
        return;
    }
    next();
};

//update profile image
export const validateUpdateProfileImage = (req: Request, res: Response, next: NextFunction): void => {
    const files = req.files as FileArray;
    const file = files?.file as UploadedFile | undefined;
    if (!file || Array.isArray(file)) {
        res.status(HTTP_STATUS.BAD_REQUEST).json({ error: EstimationFailedMessage.NO_IMAGE });
        return;
    }
    next();
};

//change password validation
export const validatechangePassword = (req: Request, res: Response, next: NextFunction): void => {
    const { email, currentpassword, password } = req.body;
    if (!currentpassword || !email || !password) {
        res.status(HTTP_STATUS.BAD_REQUEST).json(commonFailedMessage.FIELD_REQUIRED);
        return;
    }
    const trimmedcurrentpassword = currentpassword.trim();
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();
    if (trimmedEmail.length < 10) {
        res.status(HTTP_STATUS.BAD_REQUEST).json(userFailedMessage.MIN_LIMIT_EMAIL);
        return;
    }
    if (trimmedEmail.length > 50) {
        res.status(HTTP_STATUS.BAD_REQUEST).json(userFailedMessage.MAX_LIMIT_EMAIL);
        return;
    }
    if (!trimmedEmail.includes('@') || !trimmedEmail.includes('.')) {
        res.status(HTTP_STATUS.BAD_REQUEST).json(userFailedMessage.INVALID_EMAIL);
        return;
    }
    if (trimmedEmail.startsWith('@') || trimmedEmail.endsWith('@') || trimmedEmail.endsWith('.')) {
        res.status(HTTP_STATUS.BAD_REQUEST).json(userFailedMessage.INVALID_EMAIL);
        return;
    }
    if (trimmedPassword.length < 8) {
        res.status(HTTP_STATUS.BAD_REQUEST).json(userFailedMessage.MIN_LIMIT_PASSWORD);
        return;
    }
    if (trimmedPassword.length > 20) {
        res.status(HTTP_STATUS.BAD_REQUEST).json(userFailedMessage.MAX_LIMIT_PASSWORD);
        return;
    }
    const hasUpper = /[A-Z]/.test(trimmedPassword);
    const hasLower = /[a-z]/.test(trimmedPassword);
    const hasNumber = /[0-9]/.test(trimmedPassword);
    const hasSpecial = /[@$!%*?&]/.test(trimmedPassword);

    if (!hasUpper || !hasLower || !hasNumber || !hasSpecial) {
        res.status(HTTP_STATUS.BAD_REQUEST).json(userFailedMessage.WEAK_PASSWORD);
        return;
    }
    if (trimmedcurrentpassword.length < 8) {
        res.status(HTTP_STATUS.BAD_REQUEST).json(userFailedMessage.MIN_LIMIT_PASSWORD);
        return;
    }
    if (trimmedcurrentpassword.length > 20) {
        res.status(HTTP_STATUS.BAD_REQUEST).json(userFailedMessage.MAX_LIMIT_PASSWORD);
        return;
    }
    next();
};