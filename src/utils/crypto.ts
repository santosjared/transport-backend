import * as bcrypt from 'bcrypt';

export const hashCrypto = async (plain:string)=>{
    return await bcrypt.hash(plain,10);
}
export const hasCompare = async (plain:string, hash:string)=>{
    return await bcrypt.compare(plain,hash);
}