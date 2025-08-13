import bcrypt from 'bcrypt'
import { IHasherEntity } from '../../Entities/repositoryEntities/Auth-management/IHasher'

export class BcryptHasher implements IHasherEntity{
   private readonly saltRounds : number = 10
   async hash(plaintext:string):Promise<string>{
      return await bcrypt.hash(plaintext,this.saltRounds)
   }
   async compare(plaintext:string,hashedpassword:string):Promise<boolean>{
      return await bcrypt.compare(plaintext,hashedpassword)
   }
}