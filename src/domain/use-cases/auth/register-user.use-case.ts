import { JWT } from "../../../config";
import { RegisterUserDto } from "../../dtos/auth/register-user.dto";
import { CustomError } from "../../errors/custom.error";
import { AuthRepository } from "../../repositories/auth.repository";

type SignTokenFunction=(payload:Object,duration?:string)=>Promise<string | null>
interface UserToken{
    token:string,
    user:{
        id:string,
        name:string,
        email:string,
        photoUrl:string,
        phoneNumber:string
    }
}

interface RegisterUserUseCase{
    execute(registerUserDto:RegisterUserDto):Promise<UserToken>
}
export class RegisterUser implements RegisterUserUseCase{
    constructor(
        private readonly authRepository:AuthRepository,
        private readonly signToken:SignTokenFunction =JWT.generateToken 
    ){}
    async execute(registerUserDto: RegisterUserDto): Promise<UserToken> {
        const user = await this.authRepository.register(registerUserDto)


        const token = await this.signToken({id:user.id},'2h')
        if(!token) throw CustomError.internalServer('Error generating token')

        return {
            token:token,
            user:{
                id:user.id,
                name:user.name,
                email:user.email,
                photoUrl:user.photoUrl,
                phoneNumber:user.phoneNumber
            }
        }
    }
  
}   