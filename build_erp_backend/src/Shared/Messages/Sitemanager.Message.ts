export enum SitemanagerSuccessMessage {
   LOGIN = "Sitemanager Login SuccessFully",
   UPDATE_PASSWORD = "Sitemanager Password Updated Successfully",
   FETCH = "Sitemanager Data fetch successFully",
   ADD = "Project added successfully by the site manager",
   DELETE = "Site manager deleted successfully",
   SAVED = "Sitemanager Saved Successfully",
   UPDATE  ="Sitemanager Data Updated Successfully"
}

export enum SitemanagerFailedMessage {
   INVALID_EMAIL = "Sitemanager has Invalid Email",
   INVALID_PASSWORD = "Sitemanager has Invalid Password",
   NOT_EXIST = "Sitemanager not Exist",
   PASSWORD_WRONG = "Sitemanager Password is wrong",
   EXIST = "Sitemanager Already Exist",
   EMAIL_SEND_FAIL = "Failed to send Password in email",
   STAGE_ID_REQUIRED = "stageId is required and must be a valid non-empty string.",
   STAGE_ID_FORMAT = "Invalid stageId format. Must be a 24-character MongoDB ObjectId.",
   PROGRESS_REQUIRED = "newProgress is required and must be a number.",
   PROGRESS_NUMBER = "newProgress must be a number.",
   PROGRESS_BETWEEN = "newProgress must be between 0 and 100.",
   DATE_REQUIRE = "date is required and must be a valid ISO date string.",
   DATE_FORMAT = "Invalid date format. Must be a valid date (ISO 8601 preferred).",
   DATE_CANNOT_FUTURE = "Date cannot be in the future.",
   USER_NAME_REQUIRED = "Username is required and must be a non-empty string",
   USERNAME_MIN = "Username must be at least 3 characters long",
   USER_NAME_MAX = "Username cannot exceed 30 characters",
   USERNAME_EXIST = "Username can only contain letters, numbers, and underscores",
   EMAIL_REQUIRED = "Email is required and must be a non-empty string",
   EMAIL_MAX = "Email cannot exceed 50 characters"
}