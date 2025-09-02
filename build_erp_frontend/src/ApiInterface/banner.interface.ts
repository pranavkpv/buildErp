export interface AddBannerInterface {
   title: string
   subtitle: string
   file: File | null
}


export interface inputBannerInterface {
   _id: string
   title: string
   subtitle: string
   image: string
}

export interface editBannerInterface extends AddBannerInterface {
   id: string
}