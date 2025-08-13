export interface IHasherEntity{
   hash(plaintext:string):Promise<string>;
   compare(plaintext:string,hashedpassword:string):Promise<boolean>;
}