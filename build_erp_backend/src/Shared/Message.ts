export const SUCCESS_MESSAGE = {
  SITE: {
    ADD: "Project added successfully by the site manager",
    DELETE: "Site manager deleted successfully"
  },
  USER: {
    LOGIN: "Logged in successfully",
    LOGOUT: "Logged out successfully",
    OTP_SEND: "An OTP has been sent to your email. Please check your inbox and enter the OTP for verification",
    REGISTER: "OTP confirmed. User registered successfully",
    CREATED: "User created successfully",
    CONFIRM_OTP: "OTP confirmed. You can now change the password",
    PASSWORD_UPDATE: "Password updated successfully"
  },
  BRAND: {
    ADD: "Brand registered successfully",
    UPDATE: "Brand updated successfully",
    DELETE: "Brand deleted successfully",
    FETCH : "Brand fetch successfully",
    FETCH_BRAND_BY_MATERIAL_NAME:"Fetch Brands by material name is successfully"
  },
  CATEGORY: {
    ADD: "Category added successfully",
    UPDATE: "Category updated successfully",
    DELETE: "Category deleted successfully",
    FETCH : "Category data fetch successfully"
  },
  ESTIMATION: {
    ADD: "Estimation added successfully",
    DELETE: "Estimation deleted successfully",
    UPLOAD: "Image uploaded successfully",
    UPDATE: "Estimation updated successfully"
  },
  LABOUR: {
    ADD: "Labour type added successfully",
    DELETE: "Labour type deleted successfully",
    UPDATE: "Labour type updated successfully"
  },
  MATERIAL: {
    ADD: "Material added successfully",
    UPDATE: "Material updated successfully",
    DELETE: "Material deleted successfully",
    FETCH:"Material fetch successfully",
    ADDFETCH : "Add material datas fetch successfully",
    EDITFETCH : "Edit material datas fetch successfully",
    UNIQUE_MATERIAL_FETCH:"Unique material fetch successfully",
    FETCHUNITRATE : "Fetch unit rate successfully"
  },
  PROJECT: {
    ADD: "Project added successfully",
    UPDATE: "Project updated successfully",
    DELETE: "Project deleted successfully",
    CHANGE_STATUS: "Project status changed successfully to"
  },
  SITEMANAGER: {
    ADD: "Site manager registered successfully",
    UPDATE: "Site manager updated successfully",
    DELETE: "Site manager deleted successfully",
    UPDATE_PASSWORD: "Password updated successfully"
  },
  SPEC: {
    ADD: "Specification added successfully",
    DELETE: "Specification deleted successfully",
    UPDATE: "Specification updated successfully"
  },
  STAGE: {
    ADD: "Stage added successfully",
    DELETE: "Stage deleted successfully",
    UPDATE: "Stage updated successfully",
    STATUS_CHANGE: "Stage status changed successfully",
    UPLOAD_IMAGE: "Image uploaded successfully"
  },
  UNIT: {
    ADD: "Unit added successfully",
    UPDATE: "Unit updated successfully",
    DELETE: "Unit deleted successfully",
    FETCH : "Unit fetch successfully"
  },
  ATTENDANCE: {
    ADD: "Attendance recorded successfully",
    UPDATE: "Attendance updated successfully",
    DELETE: "Attendance deleted successfully",
    APPROVE: "Attendance approved successfully"
  },
  PROFILE: {
    UPDATE_PROFILE: "User profile updated successfully",
    UPDATE_IMAGE: "Profile image updated successfully"
  }
};

export const ERROR_MESSAGE = {
  USER: {
    INVALID_USER: "The username or password you entered is invalid",
    EXIST: "User already exists",
    OTP_SEND_FAIL: "Failed to send OTP email. Please try again later",
    OTP_WRONG: "The OTP you entered is incorrect",
    TIMESTAMP_MISS: "OTP creation timestamp is missing",
    EXPIRE_OTP: "Your OTP has expired. Please resend and try again",
    EMAIL_NOT_FOUND: "Email not found. Please check and try again",
    INVALID_PASSWORD: "The password you entered is invalid",
    NO_REFRESH_TOKEN: "Refresh token not provided",
    INVALID_REFRESH_TOKEN: "Refresh token is invalid",
    USER_NOT_FOUND: "User not found",
    USERNAME_MISMATCH: "This username is not allowed"
  },
  BRAND: {
    EXIST_BRAND: "Brand already exists",
    ALREADY_USED: "Brand has already been used"
  },
  CATEGORY: {
    EXIST_CATEGORY: "Category already exists",
    ALREADY_USED: "Category has already been used"
  },
  ESTIMATION: {
    USED_STAGE: "Stage setup is already completed",
    NO_IMAGE: "No image file uploaded"
  },
  LABOUR: {
    EXIST_LABOUR: "Labour type already exists",
    EXIST_SPEC: "Labour type is already used in a specification"
  },
  MATERIAL: {
    EXIST_LABOUR: "Material already exists",
    USED_SPEC: "Material is already used in a specification"
  },
  PROJECT: {
    EXIST_LABOUR: "Project name already exists"
  },
  SITEMANAGER: {
    EXIST: "Site manager already exists",
    FAIL: "Failed to register site manager",
    INVALID_EMAIL: "The email address you entered is invalid",
    INVALID_PASSWORD: "The password you entered is invalid",
    NOT_EXIST: "Site manager does not exist",
    PASSWORD_WRONG: "The password you entered is incorrect"
  },
  SPEC: {
    EXIST_NAME: "Specification name already exists",
    EXIST_ID: "Specification ID already exists",
    USED_ESTIMATION: "This specification is already used in an estimation"
  },
  STAGE: {
    NOT_ESTIMATE: "The project must be estimated first",
    ALREADY_SET: "Stage setup has already been completed for this project",
    NOT_SET: "This project stage should not be set",
    NO_IMAGE_UPLOAD: "No image file uploaded"
  },
  UNIT: {
    EXIST: "Unit already exists",
    USED : "Unit has already been used"
  },
  ATTENDANCE: {
    EXIST: "Attendance has already been recorded for this project on the same day"
  },
  UPDATEPASSWORD:{
    EXIST_GOOGLE : "User logged using google authentication so password not need",
    CURRENTPASSWORD_WRONG : "Current password entered user is incoreect check again"
  }
};
