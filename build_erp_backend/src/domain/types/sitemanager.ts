export interface Sitemanager {
  _id: string,
  username: string,
  email: string,
  password: string,
  createdAt:Date,
  updatedAt:Date
}

//input of add sitemanager
export interface addsitemanagerInput {
  username: string,
  email: string,
}



//input of editsiteamanager
export interface editSitemanagerInput {
  _id: string
  username: string,
  email: string,

}



//input of delete sitemanager
export interface deleteSitemanagerInput {
  _id: string
}
//output of delete sitemanager
export interface OutPutSitemanager{
  success:boolean,
  message:string
}

export interface changePasswordInput{
  _id :string,
  password:string,
  changedpassword:string
}

