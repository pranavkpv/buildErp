export enum userFailedMessage {
   INVALID_USER = "The username or password you entered is invalid",
   ERROR = "An error occured when fetching the data",
   EXIST_GOOGLE = "The User is already exist",
   USER_NOT_FOUND = "User not found",
   CURRENTPASSWORD_WRONG = "Users current password is wrong",
   OTP_SEND_FAIL = "Failed to send OTP email. Please try again later",
   USERNAME_MISMATCH = "This username is not allowed",
   INVALID_PASSWORD = "The password you entered is invalid",
   OTP_WRONG = "The OTP you entered is incorrect",
   TIMESTAMP_MISS = "OTP creation timestamp is missing",
   EXPIRE_OTP = "Your OTP has expired. Please resend and try again",
}

export enum userSuccessMessage {
   LOGIN = "Admin Logged in successfully",
   FETCH = "User data fetch successfully",
   PASSWORD_UPDATE = "User Password Updated successfully",
   OTP_SEND = "An OTP has been sent to your email. Please check your inbox and enter the OTP for verification",
   UPDATE_IMAGE = "Image Updated successFully",
   UPDATE_PROFILE = "User Profile Updated SuccessFully",
   CONFIRM_OTP = "OTP confirmed. You can now change the password",
   REGISTER = "OTP confirmed. User registered successfully",
   LOGOUT = "User Logout Successfully"
}