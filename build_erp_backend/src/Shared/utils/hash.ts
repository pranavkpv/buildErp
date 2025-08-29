import bcrypt from 'bcrypt';

export const hashedPassword = async(password:string):Promise<string> =>{
    return await bcrypt.hash(password,10);
};

export const comparedPassword = async(plain : string,hash :string) : Promise<boolean> =>{
    return await bcrypt.compare(plain,hash);
};