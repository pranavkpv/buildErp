// ResponseHelper.ts
import { commonOutput } from "../../application/dto/common";
import { AuthErrorMessage } from "../Messages/Auth.Message";
import { HTTP_STATUS } from "../statusCodes/statusCodes";

export const ResponseHelper = {
  success<T>(message: string, data?: T): commonOutput<T> {
    return {
      success: true,
      message,
      status_code: HTTP_STATUS.OK,
      data,
    };
  },

  createdSuccess<T>(message: string, data?: T): commonOutput<T> {
    return {
      success: true,
      message,
      status_code: HTTP_STATUS.CREATED,
      data,
    };
  },

  badRequest(message: string): commonOutput {
    return {
      success: false,
      message,
      status_code: HTTP_STATUS.BAD_REQUEST,
    };
  },

  conflictData(message: string): commonOutput {
    return {
      success: false,
      message,
      status_code: HTTP_STATUS.CONFLICT,
    };
  },

  unAuthor(): commonOutput {
    return {
      success: false,
      message: AuthErrorMessage.NOT_ACCESS,
      status_code: HTTP_STATUS.UNAUTHORIZED,
    };
  },

  default(error: Error): commonOutput {
    return {
      success: false,
      message: error.message,
      status_code: HTTP_STATUS.INTERNAL_SERVER_ERROR,
    };
  },

  serverError(message: string): commonOutput {
    return {
      success: false,
      message,
      status_code: HTTP_STATUS.INTERNAL_SERVER_ERROR,
    };
  },
};
