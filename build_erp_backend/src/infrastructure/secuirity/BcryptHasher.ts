import { IHasher } from "../../Entities/repositoryEntities/Auth-management/IHasher";
import bcrypt from 'bcrypt'

export class BcryptHasher implements IHasher{
   private readonly saltRounds : number = 10
   async hash(plaintext:string):Promise<string>{
      return await bcrypt.hash(plaintext,this.saltRounds)
   }
   async compare(plaintext:string,hashedpassword:string):Promise<boolean>{
      return await bcrypt.compare(plaintext,hashedpassword)
   }
}