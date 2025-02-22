
import { BcryptAdapter } from "../../config";
import { UserModel } from "../../data/mongodb";
import { AuthDataSource, CustomError, LoginUserDto, RegisterUserDto, UserEntity } from "../../domain";
import { VerifyUserDto } from "../../domain/dtos/auth/verify-user.dto";
import { UserMapper } from "../mappers/user.mapper";


type HashFunction =(password: string)=>string
type CompareFunction=(password: string, hashed: string)=>boolean
export class AuthDatasourceImpl implements AuthDataSource{

    constructor(
        private readonly hashPassword:HashFunction=BcryptAdapter.hash,
        private readonly comparePassword:CompareFunction=BcryptAdapter.copare
    ){}

    async register(registerUserDto: RegisterUserDto): Promise<UserEntity> {
        const {name,email,password,phoneNumber, photoUrl}=registerUserDto

        try {
            const emailExist = await UserModel.findOne({email:email})

            if(emailExist) throw CustomError.badRequest('Could not create user')
            
            const user =await UserModel.create({
                name,
                email,
                password:this.hashPassword(password),
                phoneNumber,
                photoUrl
            })

            await user.save()

            return UserMapper.userEntityFromObject(user)
        } catch (error) {
            if(error instanceof CustomError){
                throw error;
            }
            throw CustomError.internalServer()
        }
    }
    async login(loginUserDto: LoginUserDto): Promise<UserEntity> {
        const { email, password } = loginUserDto;
        try {
            const user = await UserModel.findOne({ email });
            if ( !user ) throw CustomError.badRequest('User does not exists - email');

            const isMatching = this.comparePassword(password, user.password);
            if ( !isMatching ) throw CustomError.badRequest('Password is not valid');
            return UserMapper.userEntityFromObject(user);
        } catch (error) {
            if(error instanceof CustomError){
                throw error;
            }
            throw CustomError.internalServer()
        }
    }
    async verifyEmail(verifyUserDto: VerifyUserDto): Promise<boolean> {
        const {email}=verifyUserDto
        try {
            const user = await UserModel.findOne({email})
            if ( !user ) return false
            return true

            
        } catch (error) {
            if(error instanceof CustomError){
                throw error;
            }
            throw CustomError.internalServer()
        }
    }
}