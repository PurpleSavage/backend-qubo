import { Validators } from "../../../config";

export class VerifyUserDto{
    constructor(
        public email:string,
    ){}
    static create( object: { [ key: string ]: any; } ): [ string?, VerifyUserDto?]{
        const { email } = object;
        if ( !email ) return [ 'Missing email' ];
        if(!Validators.email.test(email)) return ['Email not valid']
        return [
          undefined,
          new VerifyUserDto(email)
        ];
    }
}