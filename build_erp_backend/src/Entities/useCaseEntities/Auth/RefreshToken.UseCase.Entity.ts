export interface IRefreshTokenUseCaseEntity {
   execute(token:string):Promise<string>
}