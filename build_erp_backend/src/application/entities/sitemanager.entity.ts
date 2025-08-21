export interface addsitemanagerInput {
   username: string
   email: string
   password?: string
}

export interface editSitemanagerInput extends addsitemanagerInput {
   _id: string
}

//change password
export interface changePasswordInput {
   _id: string,
   password: string,
   changedpassword: string
}

//change status 
export interface changeStatusInput {
   stageId: string,
   newProgress: number,
   date: string
}