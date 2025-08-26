export interface IHasher{
   hash(plaintext:string):Promise<string>;
   compare(plaintext:string,hashedpassword:string):Promise<boolean>;
}