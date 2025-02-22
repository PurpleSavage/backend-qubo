import { LoginUserDto } from "../dtos/auth/login-user.dto";
import { RegisterUserDto } from "../dtos/auth/register-user.dto";
import { UserEntity } from "../entities/user.entity";
import { VerifyUserDto } from "../dtos/auth/verify-user.dto";
export abstract class AuthDataSource{
    abstract login(loginUserDto: LoginUserDto):Promise<UserEntity>
    abstract register( registerUserDto: RegisterUserDto ):Promise<UserEntity>
    abstract verifyEmail(verifyUserDto:VerifyUserDto):Promise<boolean>
}