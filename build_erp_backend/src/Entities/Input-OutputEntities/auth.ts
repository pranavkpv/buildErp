export interface Tokens {
  accessToken: string;
  refreshToken: string;
}

export interface JwtPayload {
  userId: string;
  email: string;
  role:string;
  iat:number;
  exp:number
}