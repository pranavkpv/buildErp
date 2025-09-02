export interface addBannerInput {
   title: string
   subtitle: string
   image: string
}

export interface editBannerInput extends addBannerInput {
   _id:string
}

