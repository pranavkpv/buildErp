interface Token {
   accessToken:string 
   refreshToken:string
}
export interface commonOutput{
   success:boolean
   message:string 
   status_code:number
   data?:any | any[]
   totalPage?:number
   token?:Token
}

export interface listingInput {
   page:number 
   search:string
}