import { compareSync, hashSync } from 'bcryptjs'
// patrón adaptador , esto se realiza ya que si se quiere cambiar a otra librería para encriptar, solo se tenga que hacer el cambio
//en este archivo


export class BcryptAdapter{
    static hash(password:string):string{
        return hashSync(password)
    }
    static copare(password:string,hashed:string):boolean{
        return compareSync(password,hashed)
    }
}