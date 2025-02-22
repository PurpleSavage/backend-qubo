import { AuthDataSource, AuthRepository, LoginUserDto, RegisterUserDto, UserEntity } from "../../domain";
import { VerifyUserDto } from "../../domain/dtos/auth/verify-user.dto";

export class AuthRepositoryImpl implements AuthRepository{
    constructor(
        private readonly authDatasource:AuthDataSource
    ){}
    register(registerUserDto: RegisterUserDto): Promise<UserEntity> {
        return this.authDatasource.register(registerUserDto)
    }
    login(loginUserDto: LoginUserDto): Promise<UserEntity> {
        return this.authDatasource.login(loginUserDto)
    }
    verifyEmail(verifyUserDto: VerifyUserDto): Promise<boolean> {
        return this.authDatasource.verifyEmail(verifyUserDto)
    }
}