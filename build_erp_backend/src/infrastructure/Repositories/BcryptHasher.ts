import bcrypt from 'bcrypt';
import { IHasher } from '../../domain/Entities/IRepository/IHasher';

export class BcryptHasher implements IHasher{
    private readonly _saltRounds : number = 10;
    async hash(plaintext:string):Promise<string>{
        return await bcrypt.hash(plaintext,this._saltRounds);
    }
    async compare(plaintext:string,hashedpassword:string):Promise<boolean>{
        return await bcrypt.compare(plaintext,hashedpassword);
    }
}