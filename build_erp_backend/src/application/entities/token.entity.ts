export interface Tokens {
   accessToken: string
   refreshToken: string
}

export interface createTokenInput {
   _id: string
   username: string
   role: string
}

export interface JwtPayloadData extends createTokenInput {
   iat?: number ;
   exp?: number ;
}