export interface Sitemanager {
  _id: string,
  username: string,
  email: string,
  password: string,
  createdAt:Date,
  updatedAt:Date
}


export interface addsitemanagerInput {
  username: string,
  email: string,
}



export interface editSitemanagerInput {
  _id: string
  username: string,
  email: string,

}

export interface changePasswordInput{
  _id :string,
  password:string,
  changedpassword:string
}

