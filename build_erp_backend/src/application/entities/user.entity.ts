export interface userSignupinput {
   username: string,
   email: string,
   phone: number,
   password: string
}

export interface usertempSaveInput extends userSignupinput {
   otp: string,
   otpCreatedAt: Date
}


export interface verifyOtpInput {
   otp: string,
   email: string
}

export interface loginInput {
   email: string
   password: string
}

export interface googleLoginInput {
   email: string
   username: string
   profile_image: string
}

export interface updateprofileInput extends userSignupinput {
   _id: string
}

export interface updatePasswordInput {
   _id:string
   email: string
   currentpassword: string
   password: string
}


