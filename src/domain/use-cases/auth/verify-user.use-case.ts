import { VerifyUserDto } from "../../dtos/auth/verify-user.dto";
import { AuthRepository } from "../../repositories/auth.repository";

interface VerifyfyUserUseCase{
    execute(verifyUserDto:VerifyUserDto):Promise<boolean>
}


export class VerifyUser implements VerifyfyUserUseCase{
    constructor(
            private readonly authRepository:AuthRepository,
        ){}
    async execute(verifyUserDto: VerifyUserDto): Promise<boolean> {
        const isVerify = await this.authRepository.verifyEmail(verifyUserDto!)
        return isVerify
    }
}

