export const SUCCESS_MESSAGE = {
   SITE: {
      ADD: "Sitemanager added the project successfully",
      DELETE: "Sitemanager deleted successfully",
   },
   USER: {
      LOGIN: "Login successfully",
      LOGOUT: "Logout successfully",
      OTP_SEND: "An OTP has been sent to your email. Please check your inbox and enter the OTP for verification.",
      REGISTER : "OTP confirmed. User registration successful.",
      CREATED : "User created successfully ",
      CONFIRM_OTP : "OTP confirmed.So change the password",
      PASSWORD_UPDATE : "Password updated successfully"
   },
   BRAND: {
      ADD: "Brand Registered successfuly",
      UPDATE: "Brand Updated successfuly",
      DELETE: "Brand deleted successfuly"
   },
   CATEGORY: {
      ADD: "Category saved successfully",
      UPDATE: "Category updated successfully",
      DELETE: "Category deleted successfully"
   },
   ESTIMATION: {
      ADD: "Estimation saved successfully",
      DELETE: "Estimation deleted successfully",
      UPLOAD: "Image Uploaded successFully",
      UPDATE: "Estimation updated successfully"
   },
   LABOUR: {
      ADD: "Labour type registered successfully",
      DELETE: "Labour type deleted successfully",
      UPDATE: "Labour type updated successfully"
   },
   MATERIAL: {
      ADD: "Material saved successfully",
      UPDATE: "Material updated successfully",
      DELETE: "Material deleted successfully"
   },
   PROJECT: {
      ADD: "Project registered successfully",
      UPDATE: "Project updated successfully",
      DELETE: "Project deleted successfully",
      CHANGE_STATUS: "Status changed successfully to "
   },
   SITEMANAGER: {
      ADD: "Sitemanager registered successfully",
      UPDATE: "Sitemanager updated successfully",
      DELETE: "Sitemanager deleted successfully",
      UPDATE_PASSWORD: "Password updated successfully"
   },
   SPEC: {
      ADD: "Specification saved successfully",
      DELETE: "Specification deleted successfully",
      UPDATE:"Specification Updated SuccessFully"
   },
   STAGE: {
      ADD: "Stage saved successfully",
      DELETE: "Stage deleted successfully",
      UPDATE: "Stage updated successfully",
      STATUS_CHANGE: "Stage status changed successfully",
      UPLOAD_IMAGE: "Image uploaded successfully"
   },
   UNIT: {
      ADD: "Unit registerd successfully",
      UPDATE: "Unit updated successfully",
      DELETE: "Unit deleted successfully"
   },
   ATTENDANCE: {
      ADD: "Attendance take successfully",
      UPDATE: "Attendance updated successfully",
      DELETE: "Attendance deleted successfully",
      APPROVE: "Attendance approved successfully"
   },
   PROFILE :{
      UPDATE_PROFILE:"User Profile Updated SuccessFully"
   }
}



export const ERROR_MESSAGE = {
   USER: {
      INVALID_USER: "The username or password you entered is invalid.",
      EXIST: "User Already Exist",
      OTP_SEND_FAIL: "Failed to send OTP email. Please try again later.",
      OTP_WRONG: "Entered OTP is wrong",
      TIMESTAMP_MISS : "OTP creation timestamp is missing",
      EXPIRE_OTP : "Your OTP has timed out. Kindly resend and try again.",
      EMAIL_NOT_FOUND : "Email not found. Please check the email and try again.",
      INVALID_PASSWORD: "Invalid password. Please try again.",
      NO_REFRESH_TOKEN : "No refresh token provided",
      INVALID_REFRESH_TOKEN : "Invalid refresh token",
      USER_NOT_FOUND : "User not found"
   },
   BRAND: {
      EXIST_BRAND: "Brand already exist",
      ALREADY_USED: "Brand used already"
   },
   CATEGORY: {
      EXIST_CATEGORY: "Category already exist",
      ALREADY_USED: "Category used already"
   },
   ESTIMATION: {
      USED_STAGE: "Stage setting is completed",
      NO_IMAGE: "No image file uploaded"
   },
   LABOUR: {
      EXIST_LABOUR: "labour already exist",
      EXIST_SPEC: "Labour type already used in specification registration"
   },
   MATERIAL: {
      EXIST_LABOUR: "Material already exist",
      USED_SPEC: "Material already used in specification registration"
   },
   PROJECT: {
      EXIST_LABOUR: "Project name already exist"
   },
   SITEMANAGER: {
      EXIST: "Sitemanager already exist",
      FAIL: "Sitemanager registered fail",
      INVALID_EMAIL: "Invalid email address. Please try again.",
      INVALID_PASSWORD: "Invalid password. Please try again.",
      NOT_EXIST: "Sitemanager not exist",
      PASSWORD_WRONG: "Entered password is wrong"
   },
   SPEC: {
      EXIST_NAME: "Specification name already exist",
      EXIST_ID: "SpecId already exist",
      USED_ESTIMATION: "This spec is already used in estimation"
   },
   STAGE: {
      NOT_ESTIMATE: "Please estimate that project",
      ALREADY_SET: "stage set already completed this project",
      NOT_SET: "Shouldn't set the stage of this project",
      NO_IMAGE_UPLOAD: "No image file uploaded"
   },
   UNIT: {
      EXIST: "Unit already exist"
   },
   ATTENDANCE: {
      EXIST: "Attendance already taken in this project in same days"
   }
}