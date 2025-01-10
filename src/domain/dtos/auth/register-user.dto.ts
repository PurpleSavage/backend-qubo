import { Validators } from "../../../config"


export class RegisterUserDto{
    private constructor(
        public name:string,
        public password:string,
        public email:string,
        public phoneNumber:string,
        public photoUrl:string
    ){}
    static create( object: { [ key: string ]: any; } ): [ string?, RegisterUserDto?]{

        const {name, email, password, phoneNumber, photoUrl} = object;

        if(!name) return ['Missing name']
        if(!email) return ['Missing email']
        if(!Validators.email.test(email)) return ['Email is not valid']
        if(!password) return ['Missing password']
        if(password.length<6) return ['Pssword too short']
        if(!phoneNumber) return ['Missing phone number']
        if(!Validators.phoneNumber.test(phoneNumber)) return ['Phone is not valid']
        if(!photoUrl) return ['Missing photo']

        return [
            undefined, 
            new RegisterUserDto(name,password,email,phoneNumber,photoUrl)
        ]
    }


}