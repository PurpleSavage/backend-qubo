import { CustomError, UserEntity } from "../../domain"

export class UserMapper {
    static userEntityFromObject (object:{[key:string]:any}){
        const {id,_id,name,email,password,photoUrl,phoneNumber} =object

        if(!_id || !id) throw CustomError.badRequest(' Missing id')
        
        if(!name) throw CustomError.badRequest(' Missing name')

        if(!email) throw CustomError.badRequest(' Missing email')

        if(!password) throw CustomError.badRequest(' Missing password')

        if(!photoUrl) throw CustomError.badRequest(' Missing photoUrl')
            
        if(!phoneNumber) throw CustomError.badRequest(' Missing phoneNumber')


        return new UserEntity(
            _id || id, 
            name,
            password,
            email,
            phoneNumber,
            photoUrl
        )    
    }
}