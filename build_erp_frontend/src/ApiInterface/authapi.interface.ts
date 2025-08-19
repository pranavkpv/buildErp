export interface signupInterface {
   username: string,
   email: string,
   phone: string,
   password: string
}

export interface verifyOtpInterface {
   otp: string,
   email: string
}

export interface loginInterface {
   email: string
   password: string
}

export interface loginwithGoogleInterface {
   email: string
   username: string
   profile_image: string
}

export interface statusBaseProjectInterface {
   state: string,
   searchItem: string,
   selectedArea: number,
   page: number
}