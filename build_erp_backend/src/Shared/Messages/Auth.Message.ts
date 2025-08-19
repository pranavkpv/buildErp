export enum AuthErrorMessage {
   NOT_ACCESS = " This User Couldnot To Right An Action In This Part",
   NO_TOKEN = "No Token Provided",
   NO_REFRESH_TOKEN = "No refreshToken Found",
   INVALID_REFRESH_TOKEN = "Invalid or Expired Refresh Token",
   NO_USER_EXIST = "No User Exist",
   INVALID_ACCESS_TOKEN = "No AccessToken Found",
}

export enum AuthSuccessMessage {
   ACCESS_TOKEN_CREATED = "New AccessToken Created"
}